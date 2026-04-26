import React from "react";
import Home from "../pages/Home";
import Header from "../components/Header";
import Products from "../pages/Products";
import ProductForm from "../pages/ProductForm";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./SharedLayout";

function MainLayout() {
  return (
    <>
      {/* <Home /> */}
      {/* <Products /> */}
      {/* <ProductForm /> */}
      {/* <ProductDetails /> */}
      {/* <NotFound /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MainLayout;
