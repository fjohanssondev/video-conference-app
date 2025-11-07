import { Header } from '@/components/header'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <>
    <Header />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })