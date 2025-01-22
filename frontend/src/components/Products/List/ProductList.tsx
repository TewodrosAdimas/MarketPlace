import React, { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock_quantity: number;
  image: string | null; // Change to string or null, since it's a URL
  created_at: string;
  user: number;
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("You must be logged in to view products.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/products/", {
          headers: {
            Authorization: `Bearer ${token}`, // Sending the token in the Authorization header
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            {/* <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock_quantity}</p> */}
            {/* Use the image URL directly */}
            {product.image ? (
              <img
                src={`http://127.0.0.1:8000${product.image}`} // Full URL path to image
                alt={product.name}
                width="200"
              />
            ) : (
              <p>No image available</p>
            )}
            <p>Price: ${product.price}</p>
 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
