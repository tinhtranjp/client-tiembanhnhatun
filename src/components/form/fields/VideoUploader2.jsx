import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

import { axiosClient } from "@/lib/axiosClient"

const MAX_VIDEO_SIZE = 500 * 1024 * 1024

const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/quicktime"]

export default function VideoUploader({ productId, onUploaded }) {
  const inputRef = useRef(null)

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!file) {
      setPreview("")
      return
    }

    const url = URL.createObjectURL(file)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [file])

  const handleSelectFile = (event) => {
    const selectedFile = event.target.files?.[0]

    setError("")
    setUploadedVideo(null)
    setProgress(0)

    if (!selectedFile) return

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Chỉ hỗ trợ MP4, WebM và MOV.")
      return
    }

    if (selectedFile.size > MAX_VIDEO_SIZE) {
      setError("Video không được vượt quá 500 MB.")
      return
    }

    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file || !productId || uploading) return

    try {
      setUploading(true)
      setError("")
      setProgress(0)

      // 1. Xin URL upload từ BE
      const presignResponse = await axiosClient.post("/medias/videos/presign", {
        productId: Number(productId),
        filename: file.name,
        contentType: file.type,
        bytes: file.size,
      })

      const { uploadUrl, providerKey } = presignResponse.data.data

      // 2. Upload trực tiếp lên R2
      // Dùng axios riêng, không dùng axiosClient để tránh
      // interceptor/auth header của BE gửi sang R2.
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (event) => {
          if (!event.total) return

          setProgress(Math.round((event.loaded * 100) / event.total))
        },
      })

      // 3. Xác nhận upload với BE
      const confirmResponse = await axiosClient.post("/medias/videos/confirm", {
        productId: Number(productId),
        providerKey,
        filename: file.name,
      })

      // 4. Nhận metadata video
      const result = confirmResponse.data.data

      setUploadedVideo(result)
      setProgress(100)

      onUploaded?.(result)
    } catch (err) {
      console.error("Video upload error:", err)

      setError(err.response?.data?.message || err.message || "Upload video thất bại.")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    if (uploading) return

    setFile(null)
    setUploadedVideo(null)
    setProgress(0)
    setError("")

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

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
          disabled={uploading}
        >
          Chọn video
        </Button>
      ) : (
        <>
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
              style={{
                display: "block",
                width: "100%",
                maxHeight: 320,
              }}
            />
          </Box>

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
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </Typography>

          {uploading && (
            <Stack spacing={0.5}>
              <LinearProgress
                variant="determinate"
                value={progress}
              />
              <Typography variant="caption">Đang upload: {progress}%</Typography>
            </Stack>
          )}

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

          <Stack
            direction="row"
            spacing={1}
          >
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={uploading || !!uploadedVideo}
            >
              {uploading ? "Đang upload..." : "Upload video"}
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              onClick={handleRemove}
              disabled={uploading}
            >
              Chọn lại
            </Button>
          </Stack>
        </>
      )}

      {error && (
        <Typography
          color="error"
          variant="body2"
        >
          {error}
        </Typography>
      )}
    </Stack>
  )
}
