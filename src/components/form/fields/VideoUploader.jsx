import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { toBlobURL } from "@ffmpeg/util"

import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material"

import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

import { axiosClient } from "@/lib/axiosClient"

// ======================================================
// CONFIG
// ======================================================

const MAX_VIDEO_SIZE = 500 * 1024 * 1024

const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/quicktime"]

const CORE_URL = `${import.meta.env.BASE_URL}ffmpeg/ffmpeg-core.js`
const WASM_URL = `${import.meta.env.BASE_URL}ffmpeg/ffmpeg-core.wasm`

// ======================================================
// FFMPEG INSTANCE
// ======================================================

let ffmpeg = new FFmpeg()
let ffmpegLoaded = false
let ffmpegLoading = null

// ======================================================
// HELPERS
// ======================================================

function formatSize(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || "Đã xảy ra lỗi không xác định."
}

// ======================================================
// LOAD FFMPEG
// ======================================================

async function loadFFmpeg() {
  if (ffmpegLoaded) return

  if (ffmpegLoading) {
    return ffmpegLoading
  }

  ffmpegLoading = (async () => {
    const coreURL = new URL(CORE_URL, window.location.origin).href

    const wasmURL = new URL(WASM_URL, window.location.origin).href

    // Kiểm tra file tồn tại
    const responses = await Promise.all([fetch(coreURL, { method: "HEAD" }), fetch(wasmURL, { method: "HEAD" })])

    if (responses.some((response) => !response.ok)) {
      throw new Error("Không tìm thấy FFmpeg core hoặc WASM trong public/ffmpeg.")
    }

    // Chuyển URL sang Blob URL
    const [coreBlobURL, wasmBlobURL] = await Promise.all([
      toBlobURL(coreURL, "text/javascript"),
      toBlobURL(wasmURL, "application/wasm"),
    ])

    try {
      await ffmpeg.load({
        coreURL: coreBlobURL,
        wasmURL: wasmBlobURL,
      })

      ffmpegLoaded = true
    } finally {
      URL.revokeObjectURL(coreBlobURL)
      URL.revokeObjectURL(wasmBlobURL)
    }
  })()

  try {
    await ffmpegLoading
  } catch (error) {
    console.error("FFmpeg initialization error:", error)

    ffmpeg = new FFmpeg()
    ffmpegLoaded = false

    throw error
  } finally {
    ffmpegLoading = null
  }
}

// ======================================================
// COMPRESS VIDEO
// ======================================================

async function compressVideo(file, onProgress) {
  await loadFFmpeg()

  const inputName = `input-${Date.now()}`
  const outputName = `output-${Date.now()}.mp4`

  const progressHandler = ({ progress }) => {
    if (!Number.isFinite(progress)) return

    const percent = Math.min(100, Math.max(0, Math.round(progress * 100)))

    onProgress?.(percent)
  }

  ffmpeg.on("progress", progressHandler)

  try {
    // Đọc video vào FFmpeg
    const inputBuffer = await file.arrayBuffer()

    await ffmpeg.writeFile(inputName, new Uint8Array(inputBuffer))

    // Nén video H264 + AAC
    // const exitCode = await ffmpeg.exec([
    //   "-i",
    //   inputName,
    //
    //   "-map",
    //   "0:v:0",
    //   "-map",
    //   "0:a?",
    //
    //   // Giới hạn cạnh dài tối đa 1920px
    //   "-vf",
    //   "scale=w='min(1920,iw)':h='min(1920,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
    //
    //   "-c:v",
    //   "libx264",
    //
    //   "-preset",
    //   "veryfast",
    //
    //   "-crf",
    //   "25",
    //
    //   "-c:a",
    //   "aac",
    //
    //   "-b:a",
    //   "128k",
    //
    //   "-pix_fmt",
    //   "yuv420p",
    //
    //   "-movflags",
    //   "+faststart",
    //
    //   outputName,
    // ])
    // Nén video H264, giữ nguyên âm thanh gốc
    const exitCode = await ffmpeg.exec([
      "-i",
      inputName,

      "-map",
      "0:v:0",
      "-map",
      "0:a?",

      // Giới hạn cạnh dài tối đa 1920px
      "-vf",
      "scale=w='min(1920,iw)':h='min(1920,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",

      "-c:v",
      "libx264",

      "-preset",
      "veryfast",

      "-crf",
      "25",

      // Sao chép âm thanh gốc, không mã hóa lại
      "-c:a",
      "copy",

      "-pix_fmt",
      "yuv420p",

      "-movflags",
      "+faststart",

      outputName,
    ])
    if (exitCode !== 0) {
      throw new Error(`FFmpeg kết thúc với mã lỗi ${exitCode}.`)
    }

    // Đọc video sau nén
    const output = await ffmpeg.readFile(outputName)

    if (!output || output.length === 0) {
      throw new Error("FFmpeg không tạo được video đầu ra.")
    }

    const compressedFile = new File([output], file.name.replace(/\.[^.]+$/, "") + ".mp4", {
      type: "video/mp4",
    })

    return compressedFile
  } finally {
    ffmpeg.off("progress", progressHandler)

    // Xóa file tạm
    await Promise.all([ffmpeg.deleteFile(inputName).catch(() => {}), ffmpeg.deleteFile(outputName).catch(() => {})])
  }
}

// ======================================================
// COMPONENT
// ======================================================

export default function VideoUploader({ productId, onUploaded }) {
  const inputRef = useRef(null)
  const processingRef = useRef(false)

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState("")

  const [compressing, setCompressing] = useState(false)
  const [compressionProgress, setCompressionProgress] = useState(0)
  const [compressionInfo, setCompressionInfo] = useState("")

  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [error, setError] = useState("")

  const busy = compressing || uploading

  // ====================================================
  // PREVIEW
  // ====================================================

  useEffect(() => {
    if (!file) {
      setPreview("")
      return
    }

    const url = URL.createObjectURL(file)

    setPreview(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  // ====================================================
  // SELECT FILE
  // ====================================================

  const handleSelectFile = (event) => {
    const selectedFile = event.target.files?.[0]

    setError("")
    setFile(null)
    setUploadedVideo(null)

    setUploadProgress(0)
    setCompressionProgress(0)
    setCompressionInfo("")

    if (!selectedFile) return

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Chỉ hỗ trợ MP4, WebM và MOV.")
      event.target.value = ""
      return
    }

    if (selectedFile.size > MAX_VIDEO_SIZE) {
      setError("Video không được vượt quá 500 MB.")
      event.target.value = ""
      return
    }

    setFile(selectedFile)
  }

  // ====================================================
  // UPLOAD
  // ====================================================

  const handleUpload = async () => {
    if (!file || !productId || processingRef.current || busy || uploadedVideo) {
      return
    }

    processingRef.current = true

    let uploadFile = file

    try {
      setError("")
      setCompressionInfo("")

      // ================================================
      // 1. COMPRESS
      // ================================================

      setCompressing(true)
      setCompressionProgress(0)

      const compressedFile = await compressVideo(file, setCompressionProgress)

      if (compressedFile.size < file.size) {
        uploadFile = compressedFile

        const reduction = Math.round((1 - compressedFile.size / file.size) * 100)

        setCompressionInfo(
          `Đã giảm ${formatSize(file.size - compressedFile.size)} (${reduction}%). File sau nén: ${formatSize(compressedFile.size)}`,
        )
      } else {
        setCompressionInfo("Video sau nén không nhỏ hơn video gốc. Sử dụng video gốc.")
      }

      setCompressing(false)

      // ================================================
      // 2. PRESIGN
      // ================================================

      setUploading(true)
      setUploadProgress(0)

      const presignResponse = await axiosClient.post("/medias/videos/presign", {
        productId: Number(productId),
        filename: uploadFile.name,
        contentType: uploadFile.type,
        bytes: uploadFile.size,
      })

      const { uploadUrl, providerKey } = presignResponse.data.data

      if (!uploadUrl || !providerKey) {
        throw new Error("Backend không trả về uploadUrl hoặc providerKey.")
      }

      // ================================================
      // 3. UPLOAD TO R2
      // ================================================

      await axios.put(uploadUrl, uploadFile, {
        headers: {
          "Content-Type": uploadFile.type,
        },

        onUploadProgress: (event) => {
          if (!event.total) return

          setUploadProgress(Math.round((event.loaded * 100) / event.total))
        },
      })

      // ================================================
      // 4. CONFIRM
      // ================================================

      const confirmResponse = await axiosClient.post("/medias/videos/confirm", {
        productId: Number(productId),
        providerKey,
        filename: uploadFile.name,
      })

      // ================================================
      // 5. RESULT
      // ================================================

      const result = confirmResponse.data.data

      setUploadedVideo(result)
      setUploadProgress(100)

      onUploaded?.(result)
    } catch (err) {
      console.error("Video upload error:", err)

      setError(getErrorMessage(err))
    } finally {
      setCompressing(false)
      setUploading(false)

      processingRef.current = false
    }
  }

  // ====================================================
  // REMOVE FILE
  // ====================================================

  const handleRemove = () => {
    if (busy || processingRef.current) return

    setFile(null)
    setUploadedVideo(null)

    setUploadProgress(0)
    setCompressionProgress(0)
    setCompressionInfo("")
    setError("")

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <Stack spacing={2}>
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        hidden
        onChange={handleSelectFile}
      />

      {!file ? (
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={() => inputRef.current?.click()}
          disabled={busy}
        >
          Chọn video
        </Button>
      ) : (
        <>
          {/* VIDEO PREVIEW */}

          <Box
            sx={{
              width: "100%",
              maxWidth: 480,
              bgcolor: "black",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <video
              src={preview}
              controls
              playsInline
              style={{
                display: "block",
                width: "100%",
                maxHeight: 320,
              }}
            />
          </Box>

          {/* FILE INFORMATION */}

          <Typography
            variant="body2"
            sx={{
              overflowWrap: "anywhere",
              whiteSpace: "normal",
            }}
          >
            {file.name}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Dung lượng gốc: {formatSize(file.size)}
          </Typography>

          {/* COMPRESSION PROGRESS */}

          {compressing && (
            <Stack spacing={0.5}>
              <Typography variant="body2">Đang nén video: {compressionProgress}%</Typography>

              <LinearProgress
                variant="determinate"
                value={compressionProgress}
              />
            </Stack>
          )}

          {/* COMPRESSION RESULT */}

          {compressionInfo && !compressing && (
            <Typography
              variant="caption"
              color="success.main"
            >
              {compressionInfo}
            </Typography>
          )}

          {/* UPLOAD PROGRESS */}

          {uploading && (
            <Stack spacing={0.5}>
              <Typography variant="body2">Đang upload: {uploadProgress}%</Typography>

              <LinearProgress
                variant="determinate"
                value={uploadProgress}
              />
            </Stack>
          )}

          {/* SUCCESS */}

          {uploadedVideo && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <CheckCircleIcon color="success" />

              <Typography
                color="success.main"
                variant="body2"
              >
                Upload thành công!
              </Typography>
            </Stack>
          )}

          {/* ACTIONS */}

          <Stack
            direction="row"
            spacing={1}
          >
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={busy || !!uploadedVideo}
            >
              {compressing
                ? "Đang nén..."
                : uploading
                  ? "Đang upload..."
                  : uploadedVideo
                    ? "Đã upload"
                    : "Nén và upload"}
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              onClick={handleRemove}
              disabled={busy}
            >
              Chọn lại
            </Button>
          </Stack>
        </>
      )}

      {/* ERROR */}

      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{
            overflowWrap: "anywhere",
          }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  )
}
