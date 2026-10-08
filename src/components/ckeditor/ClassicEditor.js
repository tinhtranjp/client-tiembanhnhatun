import { ClassicEditor as ClassicEditorBase } from "@ckeditor/ckeditor5-editor-classic"

import { Essentials } from "@ckeditor/ckeditor5-essentials"
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles"
import { Paragraph } from "@ckeditor/ckeditor5-paragraph"

// Image + Resize
import { Image, ImageToolbar, ImageStyle, ImageResize, ImageUpload } from "@ckeditor/ckeditor5-image"

class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Bold,
  Italic,
  Paragraph,
  Image,
  ImageToolbar,
  ImageStyle,
  ImageResize,
  ImageUpload,
]

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "bold",
      "italic",
      "|",
      "imageUpload",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "|",
      "resizeImage",
      "|",
      "undo",
      "redo",
    ],
  },
  image: {
    toolbar: ["imageStyle:inline", "imageStyle:block", "imageStyle:side", "|", "resizeImage"],
    resizeOptions: [
      {
        name: "resizeImage:original",
        label: "Original",
        value: null,
      },
      {
        name: "resizeImage:50",
        label: "50%",
        value: "50",
      },
      {
        name: "resizeImage:75",
        label: "75%",
        value: "75",
      },
    ],
  },
}

export default ClassicEditor
