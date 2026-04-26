import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByIdAction } from "../store/slices/productSlice";

function ProductDetails() {
  const { product } = useSelector((state) => state.productSlice);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductByIdAction(id));
  }, [id, dispatch]);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Product Details</h1>

        <div className="card p-4">
          <div className="card-body">
            <h5 className="card-title">Product Information</h5>
            <p className="card-text">
              <strong>ID:</strong> {product?.id}
            </p>
            <p className="card-text">
              <strong>Name:</strong> {product?.name}
            </p>
            <p className="card-text">
              <strong>Price:</strong> ${product?.price}
            </p>
            <div className="mb-3">
              <FaStar className="text-warning me-1" />
              <FaStar className="text-warning me-1" />
              <FaStar className="text-warning me-1" />
              <FaStar className="text-warning me-1" />
              <FaStar className="text-warning" />
            </div>
            <Link to="/products" className="btn btn-secondary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
