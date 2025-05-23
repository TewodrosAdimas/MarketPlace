import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config";

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
  };
  quantity: number;
}

interface CartData {
  id: number;
  user: number;
  items: CartItem[];
  total_price: string;
}

const ViewCarts: React.FC = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [message, setMessage] = useState<string>("");

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/carts/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCartData(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setMessage("Failed to load cart data. Please try again later.");
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = async (cartItemId: number) => {
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
      setMessage(response.data.detail || "Item removed from cart.");
      // Refresh cart data after removal
      fetchCartData();
    } catch (error: any) {
      setMessage(
        error.response?.data?.detail || "Failed to remove product from cart."
      );
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      {cartData ? (
        <div>
          <ul>
            {cartData.items.map((item) => (
              <li key={item.id}>
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Subtotal: $
                  {(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </p>
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  Remove from Cart
                </button>
              </li>
            ))}
          </ul>
          <h3>Total Price: ${cartData.total_price}</h3>
        </div>
      ) : (
        <p>Loading cart data...</p>
      )}
    </div>
  );
};

export default ViewCarts;
