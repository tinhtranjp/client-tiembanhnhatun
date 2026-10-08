// class MyUploadAdapter {
//   constructor(loader) {
//     this.loader = loader
//   }

//   upload() {
//     return this.loader.file.then(
//       (file) =>
//         new Promise((resolve, reject) => {
//           const data = new FormData()
//           data.append("upload", file)

//           fetch("/api/upload-image", {
//             method: "POST",
//             body: data,
//           })
//             .then((response) => response.json())
//             .then((result) => {
//               resolve({
//                 default: result.url,
//               })
//             })
//             .catch(reject)
//         }),
//     )
//   }

//   abort() {}
// }

// // Chỉ export default function này
// export default function MyUploadAdapterPlugin(editor) {
//   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//     return new MyUploadAdapter(loader)
//   }
// }
