import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProducts, deleteProduct } from '../services/api'
import MainButton from '../components/StyledComponents/MainButton'
import '../components/css/Pages.css'

export default function Products() {
  const [products, setProducts] = useState([])
  const [search,   setSearch]   = useState('')
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [deleting, setDeleting] = useState(null)

  const navigate = useNavigate() // programmatic navigation

  // ── Fetch all products ───────────────────────────────
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data } = await getProducts()
      setProducts(data)
    } catch {
      setError('Could not connect. Make sure JSON Server is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  // ── Delete ───────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    setDeleting(id)
    try {
      await deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch {
      alert('Failed to delete.')
    } finally {
      setDeleting(null)
    }
  }

  // ── Search logic ─────────────────────────────────────
  // If query is a pure number → match by id exactly
  // Otherwise → match name or price (substring)
  const filtered = products.filter(p => {
    const q = search.trim()
    if (!q) return true
    if (/^\d+$/.test(q)) return p.id === Number(q)
    return (
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      String(p.price).includes(q)
    )
  })

  return (
    <div>

      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">{products.length} items in database</p>
        </div>
        {/* useNavigate — programmatic navigation to /products/new */}
        <MainButton onClick={() => navigate('/products/new')} variant="primary">
          + Add Product
        </MainButton>
      </div>

      {/* Search */}
      <div className="search-bar">
        <span>🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by id (number), name, or price…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      {/* Loading / error states */}
      {loading && <div className="state-msg">Loading products…</div>}
      {error   && <div className="state-msg error">{error}</div>}

      {/* Table */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className="state-msg">No products match your search.</div>
          ) : (
            <div className="table-wrap">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td><span className="id-badge">#{p.id}</span></td>
                      <td className="font-medium">{p.name}</td>
                      <td><span className="price-text">${p.price.toLocaleString()}</span></td>
                      <td>
                        <div className="action-group">
                          {/* Link — normal navigation */}
                          <Link to={`/products/${p.id}`}>
                            <MainButton variant="ghost">View</MainButton>
                          </Link>
                          <Link to={`/products/edit/${p.id}`}>
                            <MainButton variant="outline">Edit</MainButton>
                          </Link>
                          <MainButton
                            variant="danger"
                            onClick={() => handleDelete(p.id)}
                            disabled={deleting === p.id}
                          >
                            {deleting === p.id ? '…' : 'Delete'}
                          </MainButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="result-count">
            Showing {filtered.length} of {products.length} products
          </p>
        </>
      )}

    </div>
  )
}