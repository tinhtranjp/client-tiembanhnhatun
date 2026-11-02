import { useEffect, useMemo, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  IconButton,
  Chip,
  Divider,
  Tooltip,
  CircularProgress,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import SaveIcon from "@mui/icons-material/Save"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"

import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

import { useCollectionGetAllWithProducts } from "./service/querries"
import {
  useCollectionRemoveProduct,
  useCollectionReorderProducts,
  useCollectionUpdateQuantity,
} from "./service/mutation"
import { useNavigateForm } from "@/hook/useNavigateFrom"

// --------------------------------------------------
// Sortable Product Card
// --------------------------------------------------

function SortableProductCard({ product, collection, onRemove, onUpdateQuantity, isRemoving, isUpdating }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: String(product.id),
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
    position: "relative",
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        borderColor: isDragging ? "primary.main" : "divider",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        p={1.5}
      >
        <Tooltip title="Kéo để sắp xếp">
          <IconButton
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            size="small"
            sx={{
              cursor: "grab",
              touchAction: "none",
              "&:active": { cursor: "grabbing" },
            }}
          >
            <DragIndicatorIcon />
          </IconButton>
        </Tooltip>

        <Box
          component="img"
          src={product.thumbnail || ""}
          alt={product.name}
          sx={{
            width: 64,
            height: 64,
            borderRadius: 1.5,
            objectFit: "cover",
            bgcolor: "action.hover",
            flexShrink: 0,
          }}
        />

        <Box
          flex={1}
          minWidth={0}
        >
          <Typography
            fontWeight={600}
            noWrap
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {Number(product.current_price || 0).toLocaleString("vi-VN")}đ
          </Typography>

          {collection.slug === "ready-cakes" && (
            <Chip
              size="small"
              label={`Số lượng: ${product.quantity}`}
              color="primary"
              variant="outlined"
              sx={{ mt: 0.5 }}
            />
          )}
        </Box>

        {collection.slug === "ready-cakes" && (
          <Tooltip title="Cập nhật số lượng">
            <span>
              <IconButton
                color="primary"
                disabled={isUpdating}
                onClick={() => onUpdateQuantity(product)}
              >
                <EditOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}

        <Tooltip title="Xóa khỏi bộ sưu tập">
          <span>
            <IconButton
              disabled={isRemoving}
              onClick={() => onRemove(product)}
              sx={{
                color: "#666",
                "&:hover": {
                  color: "#555",
                },
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Card>
  )
}

// --------------------------------------------------
// Collection Section
// --------------------------------------------------

function CollectionSection({
  collection,
  onRemove,
  onSaveOrder,
  onUpdateQuantity,
  onReorder,
  isRemoving,
  isUpdating,
  isReordering,
  originalProducts,
  onAddCollections,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const isDirty = useMemo(() => {
    const current = collection.products.map((p) => String(p.id))

    return current.length !== originalProducts.length || current.some((id, index) => id !== originalProducts[index])
  }, [collection.products, originalProducts])

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return

    const oldIndex = collection.products.findIndex((p) => String(p.id) === active.id)

    const newIndex = collection.products.findIndex((p) => String(p.id) === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    onReorder(collection.id, arrayMove(collection.products, oldIndex, newIndex))
  }

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 3 }}
    >
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
          mb={2}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Typography
                variant="h6"
                fontWeight={700}
              >
                {collection.name}
              </Typography>

              <Chip
                size="small"
                label={`${collection.products.length} sản phẩm`}
              />
              <IconButton onClick={onAddCollections}>
                <AddIcon />
              </IconButton>
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              /{collection.slug}
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Button
              size="small"
              variant="contained"
              startIcon={
                isReordering ? (
                  <CircularProgress
                    size={16}
                    color="inherit"
                  />
                ) : (
                  <SaveIcon />
                )
              }
              disabled={!isDirty || isReordering}
              onClick={() => onSaveOrder(collection)}
            >
              Lưu thứ tự
            </Button>
            {isDirty && (
              <Chip
                size="small"
                color="warning"
                label="Chưa lưu thứ tự"
              />
            )}
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {collection.products.length === 0 ? (
          <Box
            py={4}
            textAlign="center"
            color="text.secondary"
            sx={{ bgcolor: "action.hover", borderRadius: 2 }}
          >
            <Inventory2OutlinedIcon sx={{ fontSize: 36, mb: 1 }} />
            <Typography variant="body2">Chưa có sản phẩm trong bộ sưu tập này</Typography>
          </Box>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={collection.products.map((p) => String(p.id))}
              strategy={verticalListSortingStrategy}
            >
              <Stack spacing={1.5}>
                {collection.products.map((product) => (
                  <SortableProductCard
                    key={product.id}
                    product={product}
                    collection={collection}
                    onRemove={(p) => onRemove(collection, p)}
                    onUpdateQuantity={(p) => onUpdateQuantity(collection, p)}
                    isRemoving={isRemoving}
                    isUpdating={isUpdating}
                  />
                ))}
              </Stack>
            </SortableContext>
          </DndContext>
        )}
      </CardContent>
    </Card>
  )
}

// --------------------------------------------------
// Page
// --------------------------------------------------

export default function CollectionsPage() {
  const { data, isLoading, isError } = useCollectionGetAllWithProducts()

  const [collections, setCollections] = useState([])

  // Đồng bộ dữ liệu từ API
  useEffect(() => {
    setCollections(data?.data ?? [])
  }, [data])

  const originalOrders = useMemo(() => {
    const result = {}

    for (const collection of data?.data ?? []) {
      result[collection.id] = collection.products.map((p) => String(p.id))
    }

    return result
  }, [data])

  // Cập nhật thứ tự local sau khi kéo thả
  const handleReorder = (collectionId, products) => {
    setCollections((prev) =>
      prev.map((collection) => (collection.id === collectionId ? { ...collection, products } : collection)),
    )
  }

  const mutationReorder = useCollectionReorderProducts()
  // Lưu thứ tự lên BE
  const handleSaveOrder = async (collection) => {
    console.log("reorder", collection)
    try {
      await mutationReorder.mutateAsync({
        id: Number(collection.id),
        productIds: collection.products.map((p) => Number(p.id)),
      })
    } catch (error) {
      console.error(error)
    }
  }
  const mutationRemove = useCollectionRemoveProduct()
  // Xóa sản phẩm khỏi collection
  const handleRemove = async (collection, product) => {
    const confirmed = window.confirm(`Bạn có chắc muốn xóa "${product.name}" khỏi "${collection.name}" không?`)

    if (!confirmed) return

    try {
      await mutationRemove.mutateAsync({
        id: Number(collection.id),
        productId: Number(product.id),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const mutationUpdateQuantity = useCollectionUpdateQuantity()

  const handleUpdateQuantity = async (collection, product) => {
    const value = window.prompt(`Nhập số lượng hiện có của "${product.name}":`, String(product.quantity ?? 0))

    if (value === null) return

    if (value.trim() === "") {
      window.alert("Vui lòng nhập số lượng.")
      return
    }

    const quantity = Number(value)

    if (!Number.isInteger(quantity) || quantity < 0) {
      window.alert("Số lượng phải là số nguyên không âm.")
      return
    }

    if (quantity === Number(product.quantity ?? 0)) return

    try {
      await mutationUpdateQuantity.mutateAsync({
        id: Number(collection.id),
        productId: Number(product.id),
        data: { quantity },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const navigateFrom = useNavigateForm()

  const handleAddCollections = () => {
    navigateFrom("/product/list")
  }

  if (isLoading) {
    return (
      <Box
        py={10}
        display="flex"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box p={3}>
        <Typography color="error">Không thể tải danh sách bộ sưu tập.</Typography>
      </Box>
    )
  }

  return (
    <Box p={{ xs: 2, md: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Quản lý bộ sưu tập
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
            mt={0.5}
          >
            Quản lý sản phẩm, số lượng và thứ tự hiển thị trong từng bộ sưu tập.
          </Typography>
        </Box>

        {collections.map((collection) => (
          <CollectionSection
            key={collection.id}
            collection={collection}
            originalProducts={originalOrders[collection.id] ?? []}
            onReorder={handleReorder}
            onSaveOrder={handleSaveOrder}
            onRemove={handleRemove}
            onUpdateQuantity={handleUpdateQuantity}
            isRemoving={mutationRemove.isPending}
            isUpdating={mutationUpdateQuantity.isPending}
            isReordering={mutationReorder.isPending}
            onAddCollections={handleAddCollections}
          />
        ))}
      </Stack>
    </Box>
  )
}
