import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/Users/RegisterForm/RegisterForm";
import Activate from "./components/Users/Activate/Activete";
import LoginForm from "./components/Users/Login/LoginForm";
import ProductList from "./components/Products/List/ProductList";
import CreateProduct from "./components/Products/Create/CreateProduct";
import ProductDetail from "./components/Products/Detail/ProductDetail";
import ProductUpdate from "./components/Products/Update/ProductUpdate";
import ProductDelete from "./components/Products/Delete/ProductDelete";
import ViewCarts from "./components/Carts/View/ViewCarts";
import AddCart from "./components/Carts/Add/AddCart";
import RemoveCart from "./components/Carts/Remove/RemoveCart"; // Import RemoveCart

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Registration Route */}
        <Route path="/register" element={<RegisterForm />} />
        {/* Activation Route */}
        <Route path="/activate" element={<Activate />} />
        {/* Login Route */}
        <Route path="/login" element={<LoginForm />} />
        {/* Product List Route */}
        <Route path="/products" element={<ProductList />} />
        {/* Product Detail Route */}
        <Route path="/products/:id" element={<ProductDetail />} />
        {/* Product Update Route */}
        <Route path="/products/:id/update" element={<ProductUpdate />} />
        {/* Product Delete Route */}
        <Route path="/products/:id/delete" element={<ProductDelete />} />
        {/* Create Product Route */}
        <Route path="/products/create" element={<CreateProduct />} />
        {/* View Cart Route */}
        <Route path="/cart" element={<ViewCarts />} />
        {/* Add Cart Route */}
        <Route path="/cart/add" element={<AddCart />} />
        {/* Remove Cart Route */}
        <Route path="/cart/remove" element={<RemoveCart />} />{" "}
        {/* New Remove Cart Route */}
        {/* Default Route, redirect to Register if no route matches */}
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </div>
  );
};

export default App;
