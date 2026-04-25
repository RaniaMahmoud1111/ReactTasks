import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProduct, addProduct, updateProduct } from '../services/api'
import MainButton from '../components/StyledComponents/MainButton'
import '../components/css/Pages.css'

export default function ProductForm() {
  const { id }   = useParams()      // only present on /products/edit/:id
  const navigate = useNavigate()
  const isEdit   = Boolean(id)

  const [form,     setForm]     = useState({ name: '', price: '' })
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(isEdit)

  // ── Pre-fill form when editing ───────────────────────
  useEffect(() => {
    if (!isEdit) return
    const load = async () => {
      try {
        const { data } = await getProduct(id)
        setForm({ name: data.name, price: String(data.price) })
      } catch {
        alert('Product not found.')
        navigate('/products')
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [id])

  // ── Validation — prevent empty submit ───────────────
  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Name is required.'
    if (!form.price.trim()) e.price = 'Price is required.'
    else if (isNaN(Number(form.price)) || Number(form.price) < 0)
      e.price = 'Enter a valid positive number.'
    return e
  }

  // ── Submit — POST or PUT ─────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    const payload = { name: form.name.trim(), price: Number(form.price) }

    try {
      if (isEdit) {
        await updateProduct(id, payload)
      } else {
        await addProduct(payload)
      }
      navigate('/products')
    } catch {
      alert('Failed to save product.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  if (fetching) return <div className="state-msg">Loading product…</div>

  return (
    <div>

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{isEdit ? 'Edit' : 'New'}</span>
      </nav>

      <div className="form-card">
        <h1 className="form-title">
          {isEdit ? `Edit Product #${id}` : 'Add New Product'}
        </h1>
        <p className="form-subtitle">
          {isEdit ? 'Update the product details below.' : 'Fill in the details to create a new product.'}
        </p>

        <form onSubmit={handleSubmit} noValidate>

          <div className="field">
            <label className="field-label">Product Name</label>
            <input
              type="text"
              className={`field-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Wireless Headphones"
              value={form.name}
              onChange={handleChange('name')}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label className="field-label">Price ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className={`field-input ${errors.price ? 'input-error' : ''}`}
              placeholder="e.g. 99.99"
              value={form.price}
              onChange={handleChange('price')}
            />
            {errors.price && <span className="field-error">{errors.price}</span>}
          </div>

          <div className="form-actions">
            <MainButton type="button" variant="ghost" onClick={() => navigate('/products')}>
              Cancel
            </MainButton>
            <MainButton type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving…' : isEdit ? 'Update Product' : 'Add Product'}
            </MainButton>
          </div>

        </form>
      </div>

    </div>
  )
}