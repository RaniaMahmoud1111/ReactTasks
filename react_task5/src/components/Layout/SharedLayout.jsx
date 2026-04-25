import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

/**
 * SharedLayout
 * Every page is wrapped by this layout.
 * Header and Footer appear on all routes.
 * <Outlet /> renders the matched child route.
 */
export default function SharedLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}