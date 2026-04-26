import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AnotherButton } from "../StyledComponents/MainButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAction,
  updateProductAction,
  getProductByIdAction,
} from "../store/slices/productSlice";

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productForm, setProductForm] = useState({
    name: "",
    price: 0,
  });

  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productSlice);

  const inputHandler = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Fetch product details if editing an existing product
    if (id !== "0") {
      dispatch(getProductByIdAction(id));
    }
  }, [id, dispatch]);

  // Initialize form with product data when available
  const formData = id !== "0" && product && product.id ? {
    name: product.name,
    price: product.price,
  } : productForm;

  const AddNewProduct = async (e) => {
    e.preventDefault();
    if (id === "0") {
      dispatch(addProductAction(productForm));
      navigate("/products");
    } else {
      // Update product logic using Redux
      dispatch(updateProductAction({ id, product: productForm }));
      navigate("/products");
    }
  };
  return (
    <>
      <div className="container mt-5 p-5">
        <h1 className="text-center text-muted mb-5">Product Form</h1>
        <Form onSubmit={AddNewProduct}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={inputHandler}
              name="name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={inputHandler}
              name="price"
            />
          </Form.Group>
          {id === "0" ? (
            <AnotherButton type="submit">Add Product</AnotherButton>
          ) : (
            <AnotherButton type="submit">Update Product</AnotherButton>
          )}
        </Form>
      </div>
    </>
  );
}

export default ProductForm;
