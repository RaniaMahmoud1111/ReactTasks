import { useRef } from 'react'

// ProductTable Component - Renders list using map with keys
function ProductTable({ products, editingId, editValues, onEditClick, onEditChange, onSaveEdit, onCancelEdit, onDelete }) {
  const deleteButtonRefs = useRef({})

  const handleDelete = (event) => {
    // Uncontrolled delete using useRef to access DOM element's dataset
    const button = event.currentTarget
    const id = Number(button.dataset.id)
    if (!id) return
    onDelete(id)
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Free shipping</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty-row">
                No products yet
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {editingId === item.id ? (
                  <>
                    <td>
                      <input
                        name="name"
                        value={editValues.name}
                        onChange={onEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="price"
                        type="number"
                        value={editValues.price}
                        onChange={onEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="quantity"
                        type="number"
                        value={editValues.quantity}
                        onChange={onEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="category"
                        value={editValues.category}
                        onChange={onEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="freeShipping"
                        type="checkbox"
                        checked={editValues.freeShipping}
                        onChange={onEditChange}
                      />
                    </td>
                    <td className="actions">
                      <button type="button" onClick={onSaveEdit}>
                        Save
                      </button>
                      <button type="button" onClick={onCancelEdit}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.category}</td>
                    <td>{item.freeShipping ? 'Yes' : 'No'}</td>
                    <td className="actions">
                      <button type="button" onClick={() => onEditClick(item)}>
                        Edit
                      </button>
                      <button
                        ref={(el) => (deleteButtonRefs.current[item.id] = el)}
                        type="button"
                        data-id={item.id}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable