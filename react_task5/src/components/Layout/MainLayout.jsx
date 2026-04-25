import { Outlet } from 'react-router-dom'

/**
 * MainLayout
 * Nested layout used only for /products/* routes.
 * Adds the centered max-width container.
 * <Outlet /> renders Products / ProductDetails / ProductForm.
 */
export default function MainLayout() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8 w-full">
      <Outlet />
    </div>
  )
}