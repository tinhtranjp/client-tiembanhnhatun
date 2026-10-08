import { useUnitAddUnitLink } from "@/service/unit/mutation"
import { useState } from "react"
import AddUnitForm from "../features/Unit/components/AddUnitForm"
import Example from "../features/Example/Example"
import AddVocabToKanji from "@/features/Kanji/components/AddVocabToKanji"
import { Box } from "@mui/material"

export function useCommonEntityModal({ entityType }) {
  const [modal, setModal] = useState({ open: false, title: "", content: null, actions: null })

  const mutationAddUnitLink = useUnitAddUnitLink()

  const handleAppendToUnit = async (payload) => {
    await mutationAddUnitLink.mutateAsync(payload)
    setModal({ open: false })
  }

  const handleOpenModal = (type, id) => {
    let config = { title: "", content: null, actions: null }

    switch (type) {
      case "lesson":
        config = {
          title: "Thêm vào bài học",
          content: (
            <AddUnitForm
              contentId={id}
              level={5}
              onSubmit={handleAppendToUnit}
              type={entityType}
            />
          ),
        }
        break

      case "example":
        config = {
          title: "Ví dụ",
          content: (
            <Example
              contentId={id}
              contentType={entityType}
              level={5}
            />
          ),
          actions: [
            { label: "Cancel", onClick: () => setModal({ open: false }) },
            { label: "OK", color: "primary", onClick: () => console.log("OK clicked") },
          ],
        }
        break
      case "kanji":
        config = {
          title: "Kanji",
          content: (
            <AddVocabToKanji
              kanjiId={id}
              onClose={closeModal}
            />
          ),
          actions: [
            { label: "Cancel", onClick: () => setModal({ open: false }) },
            { label: "OK", color: "primary", onClick: () => console.log("OK clicked") },
          ],
        }
      case "comment":
        config = {
          title: "Comment",
          content: <Box>Comment</Box>,
          actions: [
            { label: "Cancel", onClick: () => setModal({ open: false }) },
            { label: "OK", color: "primary", onClick: () => console.log("OK clicked") },
          ],
        }
        break

      default:
        return
    }

    setModal({ open: true, ...config })
  }

  const closeModal = () => setModal({ open: false })

  return {
    modal,
    handleOpenModal,
    closeModal,
    setModal,
  }
}
