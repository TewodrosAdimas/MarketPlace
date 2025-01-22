import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock_quantity: number;
  image: File | null;
};

type ErrorResponse = {
  detail: string;
};

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock_quantity: 0,
    image: null,
  });
  const [errorMessages, setErrorMessages] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
  
    if (type === "file") {
      const input = e.target as HTMLInputElement; // Narrow the type
      setFormData((prev) => ({
        ...prev,
        image: input.files ? input.files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessages(null);

    // Create FormData object to send the form data including the image
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock_quantity", formData.stock_quantity.toString());

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      console.log([...formDataToSend.entries()]); // Debug: Log FormData content

      // Send POST request to create the product
      await axios.post(
        "http://127.0.0.1:8000/products/create/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Redirect to the product list after successful creation
      navigate("/products");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response && axiosError.response.data) {
          setErrorMessages(
            axiosError.response.data.detail || "An error occurred."
          );
        } else {
          setErrorMessages("An unexpected error occurred.");
        }
      } else {
        setErrorMessages("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-product-form-container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock_quantity" className="form-label">
            Stock Quantity:
          </label>
          <input
            type="number"
            id="stock_quantity"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            required
            className="form-control"
            min="1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Product Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="form-control"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>

        {errorMessages && (
          <div className="text-danger mt-3">
            <p>{errorMessages}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
