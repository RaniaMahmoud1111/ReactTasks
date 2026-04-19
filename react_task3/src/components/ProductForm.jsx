import { useRef } from 'react'

// ProductForm Component - Controlled Component using useState
function ProductForm({ product, onChange, onSubmit }) {
  const nameInputRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!product.name || !product.price) return

    onSubmit(product)
    // Focus name input after submit using useRef
    nameInputRef.current.focus()
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Product Name
        <input
          ref={nameInputRef}
          name="name"
          value={product.name}
          onChange={onChange}
          placeholder="Enter Product Name"
        />
      </label>
      <label>
        Product Price
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={onChange}
          placeholder="Enter Product Price"
        />
      </label>
      <label>
        Product Quantity
        <input
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={onChange}
          placeholder="Quantity"
        />
      </label>
      <label>
        Product Category
        <input
          name="category"
          value={product.category}
          onChange={onChange}
          placeholder="Category"
        />
      </label>
      <label className="checkbox-row">
        <input
          name="freeShipping"
          type="checkbox"
          checked={product.freeShipping}
          onChange={onChange}
        />
        Free Shipping
      </label>
      <button type="submit">Add New Product</button>
    </form>
  )
}

export default ProductForm