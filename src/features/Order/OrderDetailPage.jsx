import { useNavigate, useParams } from "react-router-dom"

import { useGetOrderDetail } from "./service/queries"
import OrderDetail from "./components/OrderDetail"
import { Box } from "@mui/material"
import { useOrdersTogglePaymentStatus, useOrdersUpdateStatus } from "./service/mutation"

export default function OrderDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: response, isLoading, isFetching } = useGetOrderDetail(id)

  // Điều chỉnh theo cấu trúc success(data, message, status) của BE.
  const order = response?.data?.data ?? response?.data ?? null
  const updateStatusMutation = useOrdersUpdateStatus()
  const togglePaymentStatusMutation = useOrdersTogglePaymentStatus()

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateStatusMutation.mutateAsync({ id, orderStatus: status })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTogglePaymentStatus = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn thay đổi trạng thái thanh toán của đơn hàng này không?")
      if (!confirmed) return
      await togglePaymentStatusMutation.mutateAsync({ id })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box p={2}>
      <OrderDetail
        order={order}
        loading={isLoading}
        onBack={() => navigate("/order/list")}
        updating={isFetching}
        onChangeStatus={(order, status) => {
          handleUpdateStatus(order.id, status)
        }}
        onChangePaymentStatus={(order, paymentStatus) => {
          handleTogglePaymentStatus(order.id)
        }}
      />
    </Box>
  )
}
