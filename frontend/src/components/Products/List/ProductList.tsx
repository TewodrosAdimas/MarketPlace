import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css"; // Import external CSS

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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartMessage, setCartMessage] = useState<string>("");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

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
            Authorization: `Bearer ${token}`,
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

  const handleAddToCart = async (productId: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setCartMessage("Please login to add products to the cart.");
      return;
    }

    const quantity = quantities[productId] || 1;

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/carts/add/`,
        { product_id: productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCartMessage(response.data.detail || `Product ${productId} added to cart.`);
    } catch (error: any) {
      setCartMessage(error.response?.data?.detail || "Failed to add product to cart.");
    }
  };

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value > 0 ? value : 1,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="container my-4">
      {cartMessage && <p className="text-success">{cartMessage}</p>}
      <div className="row">
        {products.map((product) => (
          <div className="col-sm-6 col-md-3 mb-4" key={product.id}>
            <div className="card h-100">
              {product.image ? (
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                />
              ) : (
                <div className="card-img-top placeholder-image">No Image</div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h5>
                <p className="text-secondary">Price: ${product.price}</p>
                <div className="mt-auto">
                  <div className="input-group mb-2">
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={quantities[product.id] || 0}
                      onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                      style={{ maxWidth: "70px" }} // Make sure input is not too wide
                    />
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAddToCart(product.id)}
                      style={{ width: "auto" }} // Adjust button width
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
