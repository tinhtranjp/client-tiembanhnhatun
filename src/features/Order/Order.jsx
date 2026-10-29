import { useState } from "react"
import { Box } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

import OrderList from "./components/OrderList"
import { orderApi } from "./service/orderApi"
import { useNavigate } from "react-router-dom"
import { orderKeys, useGetCountToday } from "./service/queries"
import { getToday } from "@/helper/common"

export default function OrderPage() {
  const [params, setParams] = useState(() => {
    const today = getToday()

    return {
      page: 1,
      limit: 10,
      pickupFrom: today,
      pickupTo: today,
      orderBy: {
        field: "pickupAt",
        direction: "asc",
      },
    }
  })
  const { data, isFetching } = useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => orderApi.search(params),
    placeholderData: (previousData) => previousData,
  })
  const { data: countToday } = useGetCountToday()
  // Điều chỉnh hai dòng dưới theo response thực tế của API.
  const orders = data?.items ?? []
  const total = data?.pagination?.total ?? 0
  const updateParams = (next) => {
    console.trace("[OrderPage] updateParams:", next)
    setParams(next)
  }

  const handleTodayPickUp = (date) => {
    setParams({
      page: 1,
      limit: 10,
      pickupFrom: date,
      pickupTo: date,
      orderBy: {
        field: "pickupAt",
        direction: "asc",
      },
    })
  }
  const navigate = useNavigate()

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2.5 }, maxWidth: 900, mx: "auto" }}>
      <OrderList
        onTodayPickUp={handleTodayPickUp}
        orders={orders}
        total={total}
        page={params.page}
        limit={params.limit}
        loading={isFetching}
        onSearch={updateParams}
        countToday={countToday?.data}
        onPageChange={(_, next) => {
          if (typeof next === "object") updateParams(next)
        }}
        onLimitChange={(_, next) => {
          if (typeof next === "object") updateParams(next)
        }}
        onOrderClick={(order) => {
          navigate(`/order/${order.id}/detail`)
        }}
      />
    </Box>
  )
}
