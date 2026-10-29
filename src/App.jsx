import NotFound from "@/components/layout/NotFound"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import GlobalModal from "./components/common/GlobalModal"
import {
  Theme,
  LayoutRoute,
  UpdateProduct,
  Home,
  ReorderTheme,
  AddProduct,
  Product,
  Hat,
  AddHat,
  UpdateHat,
  Candle,
  AddCandle,
  UpdateCandle,
  Memo,
  AddMemo,
  UpdateMemo,
  Detail,
  Order,
  AddOrder,
  UpdateOrder,
  OrderDetail,
  CakeBaseSummary,
} from "./features"
import ScrollToTop from "./hook/ScrollToTop"
import ImageZoomDialog from "./components/common/ImageZoomDiaLog"
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
  },
})

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutRoute />}>
              <Route
                element={<Home />}
                path="/"
              />
              // Theme
              <Route
                element={<Theme />}
                path="/theme/list"
              />
              <Route
                element={<ReorderTheme />}
                path="/theme/reorder"
              />
              <Route
                // Product
                element={<AddProduct />}
                path="/product/add"
              />
              <Route
                element={<UpdateProduct />}
                path="/product/:id/edit"
              />
              <Route
                element={<Product />}
                path="/product/list"
              />
              // Hat
              <Route
                element={<Hat />}
                path="/hat/list"
              />
              <Route
                element={<AddHat />}
                path="/hat/add"
              />
              <Route
                element={<UpdateHat />}
                path="/hat/:id/edit"
              />
              // Candle
              <Route
                element={<Candle />}
                path="/candle/list"
              />
              <Route
                element={<AddCandle />}
                path="/candle/add"
              />
              <Route
                element={<UpdateCandle />}
                path="/candle/:id/edit"
              />
              // Memo
              <Route
                element={<Memo />}
                path="/memo/list"
              />
              <Route
                element={<AddMemo />}
                path="/memo/add"
              />
              <Route
                element={<UpdateMemo />}
                path="/memo/:id/edit"
              />
              <Route
                element={<Detail />}
                path="/memo/:id/detail"
              />
              // Order
              <Route
                element={<Order />}
                path="/order/list"
              />
              <Route
                element={<AddOrder />}
                path="/order/add"
              />
              <Route
                element={<UpdateOrder />}
                path="/order/:id/edit"
              />
              <Route
                element={<OrderDetail />}
                path="/order/:id/detail"
              />
              <Route
                element={<CakeBaseSummary />}
                path="/order/cakebase-summary"
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Route>
          </Routes>

          <ScrollToTop />
        </BrowserRouter>

        <GlobalModal />
        <ImageZoomDialog />
        <CssBaseline />
      </ThemeProvider>
      <Toaster richColors />
      <GlobalModal />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
