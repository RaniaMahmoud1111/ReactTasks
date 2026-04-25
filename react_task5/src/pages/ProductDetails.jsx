import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProduct, deleteProduct } from '../services/api'
import MainButton from '../components/StyledComponents/MainButton'
import '../components/css/Pages.css'

export default function ProductDetails() {
  const { id }    = useParams()    // reads :id from /products/:id
  const navigate  = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getProduct(id)
        setProduct(data)
      } catch {
        setError('Product not found.')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this product?')) return
    try {
      await deleteProduct(id)
      navigate('/products') // useNavigate — go back after delete
    } catch {
      alert('Failed to delete.')
    }
  }

  if (loading) return <div className="state-msg">Loading…</div>
  if (error)   return <div className="state-msg error">{error}</div>

  return (
    <div>

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="detail-card">
        <div className="detail-header">
          <div>
            <span className="detail-id">Product #{product.id}</span>
            <h1 className="detail-name">{product.name}</h1>
          </div>
          <span className="detail-price">${product.price.toLocaleString()}</span>
        </div>

        <div className="detail-meta">
          <div className="meta-item">
            <span className="meta-label">ID</span>
            <span className="meta-value">{product.id}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Name</span>
            <span className="meta-value">{product.name}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Price</span>
            <span className="meta-value price-text">${product.price}</span>
          </div>
        </div>

        <div className="detail-actions">
          <MainButton onClick={() => navigate('/products')} variant="ghost">
            ← Back
          </MainButton>
          <Link to={`/products/edit/${product.id}`}>
            <MainButton variant="outline">Edit</MainButton>
          </Link>
          <MainButton variant="danger" onClick={handleDelete}>
            Delete
          </MainButton>
        </div>
      </div>

    </div>
  )
}