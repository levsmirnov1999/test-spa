import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import MainPage from "./pages/MainPage/MainPage";

const App: React.FC = () => {
  console.log("Pages loaded:", {
    ProductsPage,
    ProductDetailPage,
    CreateProductPage,
    MainPage,
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
      </Routes>
    </>
  );
};

export default App;
