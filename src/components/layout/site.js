import { IoMdSettings } from "react-icons/io"
import { VscFeedback } from "react-icons/vsc"
import { HiLanguage } from "react-icons/hi2"
import { GiFireflake, GiWhiteBook } from "react-icons/gi"
import { AiOutlineRead } from "react-icons/ai"
import { FaUsers } from "react-icons/fa"
import { MdQuiz } from "react-icons/md"
import { CiMaximize2 } from "react-icons/ci"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import AutofpsSelectRoundedIcon from "@mui/icons-material/AutofpsSelectRounded"
export const menuNavbarAdmin = [
  {
    id: 1,
    label: "Bài học",
    Icon: AiOutlineRead,
    subMenu: [
      {
        id: 11,
        label: "Danh sách bài học",
        href: "/lesson",
      },
    ],
  },
  {
    id: 2,
    label: "Từ vựng",
    Icon: HiLanguage,
    subMenu: [
      {
        id: 21,
        label: "Danh sách từ vựng",
        href: "/vocab",
      },
      {
        id: 22,
        label: "Thêm từ vựng",
        href: "/vocab/add",
      },
    ],
  },
  {
    id: 3,
    label: "Ngữ pháp",
    Icon: GiWhiteBook,
    subMenu: [
      {
        id: 31,
        label: "Danh sách ngữ pháp",
        href: "/grammar",
      },
      {
        id: 32,
        label: "Thêm ngữ pháp",
        href: "/grammar/add",
      },
    ],
  },
  {
    id: 4,
    label: "Kanji",
    Icon: GiFireflake,
    subMenu: [
      {
        id: 41,
        label: "Danh sách kanji",
        href: "/kanji",
      },
      {
        id: 32,
        label: "Thêm kanji",
        href: "/kanji/add",
      },
    ],
  },
  {
    id: 5,
    label: "Bài tập",
    Icon: MdQuiz,
    subMenu: [
      {
        id: 51,
        label: "Danh sách bài tập",
        href: "/question",
      },
    ],
  },
  {
    id: 6,
    label: "Người dùng",
    Icon: FaUsers,
    subMenu: [
      {
        id: 61,
        label: "Quản lý người dùng",
        href: "/users",
      },
      {
        id: 62,
        label: "Danh sách role",
        href: "/users/roles",
      },
      {
        id: 63,
        label: "Sắp xếp role",
        href: "/users/roles/reorder",
      },
    ],
  },
  {
    id: 7,
    label: "Bình luận",
    Icon: VscFeedback,
    subMenu: [
      {
        id: 71,
        label: "Quản lý bình luận",
        href: "/comments",
      },
    ],
  },
  {
    id: 12,
    label: "Kiểu từ vựng",
    Icon: AutofpsSelectRoundedIcon,
    subMenu: [
      {
        id: 121,
        label: "Danh sách kiểu từ vựng",
        href: "/vocab-type",
      },
      {
        id: 122,
        label: "Thêm kiểu từ vựng",
        href: "/vocab-type/add",
      },
      {
        id: 123,
        label: "Sắp xếp kiểu từ vựng",
        href: "/vocab-type/reorder",
      },
    ],
  },
  {
    id: 11,
    label: "Tag",
    Icon: LocalOfferIcon,
    subMenu: [
      {
        id: 111,
        label: "Danh sách Tag",
        href: "/tags",
      },
      {
        id: 112,
        label: "Thêm Tag",
        href: "/tags/add",
      },
      {
        id: 113,
        label: "Sắp xếp Tag Scope",
        href: "/tags/reorder",
      },
    ],
  },
  {
    id: 10,
    label: "Tag Scope",
    Icon: CiMaximize2,
    subMenu: [
      {
        id: 101,
        label: "Danh sách Tag Scope",
        href: "/tag-scopes",
      },
      {
        id: 102,
        label: "Thêm Tag Scope",
        href: "/tag-scopes/add",
      },
      {
        id: 103,
        label: "Sắp xếp Tag Scope",
        href: "/tag-scopes/reorder",
      },
    ],
  },
  {
    id: 9,
    label: "Cài đặt",
    Icon: IoMdSettings,
    subMenu: [
      {
        id: 81,
        label: "Cài đặt",
        href: "/settings",
      },
    ],
  },
]
