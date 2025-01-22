import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assumes React Router is used
import axios from "axios";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock_quantity: number;
  image: string | null;
  created_at: string;
  user: number;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock_quantity}</p>
      <p>Added on: {new Date(product.created_at).toLocaleDateString()}</p>
      {product.image ? (
        <img
          src={`http://127.0.0.1:8000${product.image}`}
          alt={product.name}
          width="300"
        />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default ProductDetail;
