import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductDelete: React.FC = () => {
  const { id } = useParams(); // Get the product ID from URL params
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDeleteProduct = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("You must be logged in to delete the product.");
        return;
      }

      // Make a DELETE request to the backend API to delete the product
      const response = await axios.delete(
        `http://127.0.0.1:8000/products/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.message); // Display success message
      // Redirect to product list or another page after successful deletion
      setTimeout(() => navigate("/products"), 2000);
    } catch (error) {
      setError("Failed to delete product. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <p>Are you sure you want to delete this product?</p>

      <button onClick={handleDeleteProduct}>Yes, Delete</button>
      <button onClick={() => navigate(`/products/${id}`)}>Cancel</button>
    </div>
  );
};

export default ProductDelete;
