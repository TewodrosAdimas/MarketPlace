import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config";

const AddCart: React.FC = () => {
  const [productId, setProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [message, setMessage] = useState<string>("");

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("Please login to add products to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/carts/add/`,
        {
          product_id: productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.detail || "Product added to cart.");
    } catch (error: any) {
      setMessage(error.response?.data?.detail || "Failed to add product to cart.");
    }
  };

  return (
    <div>
      <h2>Add to Cart</h2>
      <div>
        <label>Product ID:</label>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(Number(e.target.value) || "")}
          placeholder="Enter Product ID"
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value) || "")}
          placeholder="Enter Quantity"
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCart;
