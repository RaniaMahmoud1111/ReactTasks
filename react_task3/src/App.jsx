import { useEffect, useState } from 'react'
import './App.css'
import ProductForm from './components/ProductForm'
import ProductTable from './components/ProductTable'

const emptyProduct = {
  name: '',
  price: '',
  quantity: '',
  category: '',
  freeShipping: false,
}

function App() {
  const [product, setProduct] = useState(emptyProduct)
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState(emptyProduct)

  // useEffect for side effects - logging when products change (Mount/Update)
  useEffect(() => {
    console.log('Products updated:', products)
  }, [products])

  // useEffect for component lifecycle - Mount
  useEffect(() => {
    console.log('App component mounted')
    return () => {
      console.log('App component will unmount')
    }
  }, [])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (productData) => {
    setProducts((prev) => [
      ...prev,
      { id: Date.now(), ...productData, price: Number(productData.price) },
    ])
    setProduct(emptyProduct)
  }

  const handleEditClick = (item) => {
    setEditingId(item.id)
    setEditValues(item)
  }

  const handleEditChange = (event) => {
    const { name, value, type, checked } = event.target
    setEditValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSaveEdit = () => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, ...editValues, price: Number(editValues.price) } : item
      )
    )
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="app-shell">
      <div className="card">
        <h1>Product List</h1>
        {/* Parent → Child: passing props and callbacks */}
        <ProductForm
          product={product}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        {/* Parent → Child: passing props and callbacks */}
        <ProductTable
          products={products}
          editingId={editingId}
          editValues={editValues}
          onEditClick={handleEditClick}
          onEditChange={handleEditChange}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default App
