import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock_quantity: number;
  image_url: string;
  created_at: string;
  user: number;
}

// Define the props for ProductList, including the userType
interface ProductListProps {
  userType: "buyer" | "seller" | null;
}

const ProductList: React.FC<ProductListProps> = ({ userType }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    axios
      .get<Product[]>("http://localhost:8000/products/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error); // This will log the full error to the console
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
      <h2>Product List</h2>
      <p>User Type: {userType}</p> {/* You can use userType here if needed */}
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: "20px" }}>
              <h3>{product.name}</h3>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Price:</strong> ${product.price.toFixed(2)}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Stock Quantity:</strong> {product.stock_quantity}
              </p>
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
