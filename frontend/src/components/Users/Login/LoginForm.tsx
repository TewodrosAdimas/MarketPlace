import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

type ApiResponse = {
  access: string;
  refresh: string;
};

type ApiError = {
  detail: string;
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessages(null);

    try {
      const response = await axios.post<ApiResponse>(
        "http://127.0.0.1:8000/users/login/",
        {
          email,
          password,
        }
      );

      // Storing JWT tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Redirect user after successful login to product list page
      navigate("/products");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response && axiosError.response.data) {
          setErrorMessages(axiosError.response.data.detail);
        } else {
          setErrorMessages("An unexpected error occurred. Please try again.");
        }
      } else {
        setErrorMessages("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? "Logging in..." : "Login"}
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

export default LoginForm;
