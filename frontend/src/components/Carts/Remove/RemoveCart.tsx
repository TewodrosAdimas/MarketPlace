import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config";

const RemoveCart: React.FC = () => {
  const [cartItemId, setCartItemId] = useState("");
  const [message, setMessage] = useState("");

  const handleRemoveFromCart = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in to remove an item from the cart.");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/carts/remove/${cartItemId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.detail);
    } catch (error: any) {
      setMessage(
        error.response?.data?.detail || "Failed to remove product from cart."
      );
    }
  };

  return (
    <div>
      <h2>Remove Item from Cart</h2>
      <input
        type="text"
        placeholder="Cart Item ID"
        value={cartItemId}
        onChange={(e) => setCartItemId(e.target.value)}
      />
      <button onClick={handleRemoveFromCart}>Remove from Cart</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RemoveCart;
