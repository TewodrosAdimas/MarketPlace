import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";
import { AxiosError } from "axios";

type UserType = "buyer" | "seller";

type FormData = {
  username: string;
  email: string;
  password: string;
  user_type: UserType;
};

type ApiResponse = {
  message: string;
};

type ApiError = {
  [key: string]: string[];
};

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    user_type: "buyer",
  });

  const [errorMessages, setErrorMessages] = useState<ApiError | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Call validation function after each input change
    validateForm();
  };

  // Validate form fields in real-time
  const validateForm = (): void => {
    const errors: ApiError = {};
    
    // Username validation
    if (!formData.username) {
      errors.username = ["Username is required."];
    }

    // Email validation (basic format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = ["Email is required."];
    } else if (!emailRegex.test(formData.email)) {
      errors.email = ["Please enter a valid email address."];
    }

    // Password validation (min 8 characters, 1 uppercase, 1 number, 1 lowercase)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!formData.password) {
      errors.password = ["Password is required."];
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = [
        "Password must be at least 8 characters long, with 1 uppercase letter, 1 lowercase letter, and 1 number.",
      ];
    }

    // User Type validation (already handled with default value but can be extended)
    if (!formData.user_type) {
      errors.user_type = ["User type is required."];
    }

    setErrorMessages(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);

    // Perform final validation check before submission
    validateForm();

    if (Object.keys(errorMessages || {}).length > 0) {
      setIsSubmitting(false);
      return; // If there are any errors, don't proceed with submission
    }

    try {
      const response = await axios.post<ApiResponse>("/register/", formData);
      setSuccessMessage(response.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        user_type: "buyer",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response && axiosError.response.status === 400) {
          setErrorMessages(axiosError.response.data);
        } else {
          setErrorMessages({ general: ["An unexpected error occurred."] });
        }
      } else {
        setErrorMessages({ general: ["An unexpected error occurred."] });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="form-control"
        />
        {errorMessages?.username && (
          <div className="text-danger">{errorMessages.username.join(", ")}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-control"
        />
        {errorMessages?.email && (
          <div className="text-danger">{errorMessages.email.join(", ")}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-control"
        />
        {errorMessages?.password && (
          <div className="text-danger">{errorMessages.password.join(", ")}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="user_type" className="form-label">
          User Type:
        </label>
        <select
          id="user_type"
          name="user_type"
          value={formData.user_type}
          onChange={handleChange}
          className="form-select"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        {errorMessages?.user_type && (
          <div className="text-danger">
            {errorMessages.user_type.join(", ")}
          </div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        {isSubmitting ? "Submitting..." : "Register"}
      </button>

      {successMessage && (
        <div className="text-success mt-3">{successMessage}</div>
      )}
      {errorMessages?.general && (
        <div className="text-danger mt-3">
          {errorMessages.general.join(", ")}
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
