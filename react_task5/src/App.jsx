import { Routes, Route, Navigate } from 'react-router-dom'
import SharedLayout   from './components/Layout/SharedLayout'
import MainLayout     from './components/Layout/MainLayout'
import Home           from './pages/Home'
import Products       from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import ProductForm    from './pages/ProductForm'
import NotFound       from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* SharedLayout wraps every page — provides Header + Footer via <Outlet> */}
      <Route path="/" element={<SharedLayout />}>

        <Route index element={<Home />} />

        {/* Nested routes under /products — MainLayout adds max-width container */}
        <Route path="products" element={<MainLayout />}>
          <Route index                element={<Products />} />
          <Route path=":id"           element={<ProductDetails />} />
          <Route path="new"           element={<ProductForm />} />
          <Route path="edit/:id"      element={<ProductForm />} />
        </Route>

        {/* Navigate — automatic redirect */}
        <Route path="home" element={<Navigate to="/" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}