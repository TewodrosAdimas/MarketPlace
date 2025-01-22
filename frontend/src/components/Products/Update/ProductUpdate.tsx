import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

const ProductUpdate: React.FC = () => {
  const { id } = useParams(); // Get the product ID from URL params
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [stock_quantity, setStockQuantity] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null); // For image file
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("You must be logged in to update the product.");
          return;
        }
        
        const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const productData = response.data;
        setProduct(productData);
        setName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
        setCategory(productData.category);
        setStockQuantity(productData.stock_quantity);
        // Don't set image_url as a string, it will be handled by file input
      } catch (error) {
        setError("Failed to fetch product details. Please try again later.");
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("You must be logged in to update the product.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("category", category);
      formData.append("stock_quantity", stock_quantity.toString());
      if (image) {
        formData.append("image", image); // Append the image file
      }

      await axios.put(
        `http://127.0.0.1:8000/products/${id}/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set the content type for file upload
          },
        }
      );

      // Redirect to the product details page after successful update
      navigate(`/products/${id}`);
    } catch (error) {
      setError("Failed to update product. Please try again later.");
    }
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <h2>Update Product</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleUpdateProduct}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="stock_quantity">Stock Quantity</label>
          <input
            type="number"
            id="stock_quantity"
            value={stock_quantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="image_url">Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]); // Set the selected file
              }
            }}
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default ProductUpdate;
