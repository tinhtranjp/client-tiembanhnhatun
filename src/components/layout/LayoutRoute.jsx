import { Outlet } from "react-router-dom"
import { Layout } from "../../features"

function LayoutRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default LayoutRoute
