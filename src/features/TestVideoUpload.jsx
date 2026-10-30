import VideoUploader from "@/components/form/fields/VideoUploader"

export default function TestVideoUpload() {
  return (
    <VideoUploader
      productId={1}
      onUploaded={(video) => {
        console.log("Video metadata:", video)
      }}
    />
  )
}
