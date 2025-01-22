import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "./RegisterForm.css";

type UserType = "buyer" | "seller";

type FormData = {
  username: string;
  email: string;
  password: string;
  user_type: UserType;
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

  const [errorMessages, setErrorMessages] = useState<ApiError>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const validateUsername = (username: string) => {
    if (!username.trim()) {
      return "Username is required.";
    }
    return null;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i;
    if (!email.trim()) {
      return "Email is required.";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const validatePassword = (password: string) => {
    if (!password || password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return null;
  };

  const validateUserType = (userType: UserType) => {
    if (!["buyer", "seller"].includes(userType)) {
      return "User type must be either 'buyer' or 'seller'.";
    }
    return null;
  };

  const handleValidation = (field: keyof FormData, value: string) => {
    let error = null;
    switch (field) {
      case "username":
        error = validateUsername(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "user_type":
        error = validateUserType(value as UserType);
        break;
    }

    setErrorMessages((prev) => {
      const updatedErrors = { ...prev };
      if (error) {
        updatedErrors[field] = [error];
      } else {
        delete updatedErrors[field];
      }
      return updatedErrors;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    handleValidation(name as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/register/",
        formData
      );
      setSuccessMessage(response.data.message);

      if (formData.user_type === "buyer") {
        // Redirect buyer to activation page
        navigate("/activate", { state: { email: formData.email } });
      } else {
        // Redirect seller directly to login page
        navigate("/login");
      }
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
        {errorMessages.username && (
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
        {errorMessages.email && (
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
        {errorMessages.password && (
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
        {errorMessages.user_type && (
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
      {errorMessages.general && (
        <div className="text-danger mt-3">
          {errorMessages.general.join(", ")}
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
