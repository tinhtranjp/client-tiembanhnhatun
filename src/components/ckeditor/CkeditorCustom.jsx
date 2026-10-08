import { CKEditor } from "@ckeditor/ckeditor5-react"
import { Typography } from "@mui/material"
import {
  // Alignment & Indentation
  Alignment,
  AutoImage,
  AutoLink,
  BlockQuote,
  // Text Formatting
  Bold,
  ClassicEditor,
  // Clipboard
  Clipboard,
  Code,
  CodeBlock,
  // Enter & Shift Enter
  Enter,
  // Essential
  Essentials,
  // Find & Replace
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  // Font Styling
  FontSize,
  // HTML Support (required by Style)
  GeneralHtmlSupport,
  // Headings & Structure
  Heading,
  // Highlight & Code
  Highlight,
  HorizontalLine,
  // Images
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  // Links
  Link,
  LinkImage,
  // Lists
  List,
  // Media
  MediaEmbed,
  PageBreak,
  Paragraph,
  // Paste from Office
  PasteFromOffice,

  // Remove Format
  RemoveFormat,
  // Select All
  SelectAll,
  ShiftEnter,
  // Source Editing
  SourceEditing,
  // Special Characters
  SpecialCharacters,
  SpecialCharactersArrows,
  Strikethrough,
  // Style Plugin
  Style,
  Subscript,
  Superscript,
  // Tables
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  // Text Transformation
  TextTransformation,
  TodoList,
  // Typing
  Typing,
  Underline,
  // Undo
  Undo,
} from "ckeditor5"
import "ckeditor5/ckeditor5.css"
import "./ck.css"
import { useState, forwardRef, useImperativeHandle } from "react"
import { EmojiSpecialCharacters } from "./EmojiSpecialCharacters"
import { colors, headings, styles } from "./common"
import { mediaApi } from "@/features/Media/service/mediaApi"

const CkeditorCustom = forwardRef(function CkeditorCustom(
  { folder, label = "Mô tả", relatedType, imageType, messError, onChange, value, height = "100px", scrollable = false },
  ref,
) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [uploadMedia, setUploadMedia] = useState([])

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  useImperativeHandle(
    ref,
    () => ({
      getUploadMedia() {
        return uploadMedia
      },
    }),
    [uploadMedia],
  )
  function MyUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload() {
          return loader.file.then((file) => {
            return mediaApi
              .uploadCkeditorImage(file, {
                folder,
                relatedType,
                imageType,
              })
              .then((res) => {
                const media = {
                  id: res.data.id,
                  url: res.data.secure_url,
                }

                setUploadMedia((prev) => {
                  const next = [...prev, media]
                  return next
                })

                return {
                  default: res.data.secure_url,
                }
              })
          })
        },

        abort() {},
      }
    }
  }

  return (
    <div
      style={{
        width: isFullscreen ? "100%" : "100%",
        height: isFullscreen ? "100dvh" : "auto",
      }}
      className="t-ckeditor"
    >
      <Typography
        marginBottom={1}
        marginLeft={2}
        sx={(theme) => ({
          color: messError ? theme.palette.error.main : "",
        })}
      >
        {label}
      </Typography>

      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",
          plugins: [
            // Essential
            Essentials,
            Paragraph,
            Heading,

            // Text Formatting
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Code,
            Subscript,
            Superscript,

            // Font
            FontSize,
            FontFamily,
            FontColor,
            FontBackgroundColor,

            // Highlight & Code
            Highlight,
            CodeBlock,

            // Structure
            BlockQuote,
            HorizontalLine,
            PageBreak,

            // Alignment
            Alignment,
            Indent,
            IndentBlock,
            // Images
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            ImageResize,
            ImageTextAlternative,
            ImageInsert,
            AutoImage,

            // Links
            Link,
            LinkImage,
            AutoLink,

            // Lists
            List,
            TodoList,

            // Tables
            Table,
            TableToolbar,
            TableProperties,
            TableCellProperties,
            TableColumnResize,
            TableCaption,

            // Media
            MediaEmbed,

            // Special Characters
            SpecialCharacters,
            SpecialCharactersArrows,

            // Find & Replace
            FindAndReplace,

            // Source Editing
            SourceEditing,

            // Paste from Office
            PasteFromOffice,

            // Remove Format
            RemoveFormat,

            // Text Transformation
            TextTransformation,

            // Core features
            Typing,
            Enter,
            ShiftEnter,
            SelectAll,
            Undo,
            Clipboard,

            // Style Plugin
            Style,

            // HTML Support (required by Style)
            GeneralHtmlSupport,

            // Custom Upload
            MyUploadAdapterPlugin,
            EmojiSpecialCharacters,
          ],
          toolbar: {
            items: [
              "heading",
              "|",
              "style",
              "|",
              "fontSize",
              "fontFamily",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "subscript",
              "superscript",
              "code",
              "|",
              "highlight",
              "removeFormat",
              "|",
              "alignment",
              "outdent",
              "indent",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "|",
              "link",
              "imageUpload",
              "mediaEmbed",
              "insertTable",
              "|",
              "blockQuote",
              "codeBlock",
              "horizontalLine",
              "pageBreak",
              "|",
              "specialCharacters",
              "findAndReplace",
              "|",
              "sourceEditing",
              "|",
              "undo",
              "redo",
            ],
            shouldNotGroupWhenFull: true,
          },

          // HTML Support config
          htmlSupport: {
            allow: [
              {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true,
              },
            ],
          },

          // Style config
          style: styles,

          // Heading config
          heading: headings,

          // Font config
          fontSize: {
            options: [9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
          },

          fontFamily: {
            options: [
              "default",
              "Arial, Helvetica, sans-serif",
              "Courier New, Courier, monospace",
              "Georgia, serif",
              "Lucida Sans Unicode, Lucida Grande, sans-serif",
              "Tahoma, Geneva, sans-serif",
              "Times New Roman, Times, serif",
              "Trebuchet MS, Helvetica, sans-serif",
              "Verdana, Geneva, sans-serif",
            ],
          },

          // color config
          fontColor: {
            colors: colors,
            columns: 10,
          },

          fontBackgroundColor: {
            colors: colors,
            columns: 10,
          },
          // Image config
          image: {
            toolbar: [
              "imageStyle:inline",
              "imageStyle:alignLeft",
              "imageStyle:alignCenter",
              "imageStyle:alignRight",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "resizeImage",
              "|",
              "imageTextAlternative",
              "linkImage",
              "|",
              "imageCaption",
            ],
            resizeOptions: [
              {
                name: "resizeImage:original",
                label: "Original size",
                value: null,
              },
              {
                name: "resizeImage:25",
                label: "25%",
                value: "25",
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
            styles: ["alignLeft", "alignCenter", "alignRight", "block", "side"],
          },

          // Table config
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
              "toggleTableCaption",
            ],
          },

          // Link config
          link: {
            decorators: {
              openInNewTab: {
                mode: "manual",
                label: "Open in a new tab",
                attributes: {
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            },
          },

          // Code block config
          codeBlock: {
            languages: [
              { language: "css", label: "CSS" },
              { language: "html", label: "HTML" },
              { language: "javascript", label: "JavaScript" },
              { language: "php", label: "PHP" },
              { language: "python", label: "Python" },
              { language: "sql", label: "SQL" },
              { language: "xml", label: "XML" },
            ],
          },

          // List config
          list: {
            properties: {
              styles: true,
              startIndex: true,
              reversed: true,
            },
          },
        }}
        onReady={(editor) => {
          editor.editing.view.change((writer) => {
            const root = editor.editing.view.document.getRoot()
            writer.setStyle("min-height", height, root)
            if (scrollable) {
              writer.setStyle("max-height", height, root)
              writer.setStyle("overflow-y", "auto", root)
            }
          })
        }}
        data={value}
        onChange={(event, editor) => {
          try {
            const data = editor.getData()
            onChange?.(data)
          } catch (error) {
            console.error("Editor onChange error:", error)
          }
        }}
        onFocus={() => {
          if (isMobile) {
            setIsFullscreen(true)
          }
        }}
        onBlur={() => {
          if (isMobile) {
            setIsFullscreen(false)
          }
        }}
      />
      {messError && (
        <Typography
          variant="caption"
          marginTop={1}
          marginLeft={2}
          sx={(theme) => ({
            color: theme.palette.error.main,
          })}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {messError}
        </Typography>
      )}
    </div>
  )
})
export default CkeditorCustom
