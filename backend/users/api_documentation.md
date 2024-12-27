### **1. User Registration (`POST /register/`)**

#### **Description**:

Registers a new user as either a **seller** or **buyer**. For sellers, the account is deactivated and requires admin approval. For buyers, a verification code is sent via email to activate the account.

#### **Request**:

- **Method**: `POST`
- **Endpoint**: `/register/`
- **Request Body**:
  ```json
  {
    "username": "tew",
    "email": "user@example.com",
    "password": "strong_password",
    "user_type": "buyer" // or "seller"
  }
  ```

#### **Response**:

- **Status**: `201 Created`
- **Response Body**:
  ```json
  {
    "message": "User registered successfully. Please check email or wait for approval."
  }
  ```

#### **Errors**:

- **Status**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "username": ["This field is required."],
      "email": ["This field is required."],
      "password": ["This field is required."],
      "user_type": ["This field is required."]
    }
    ```

---

### **2. Login (`POST /login/`)**

#### **Description**:

Logs in a user using **email** and **password**, and returns JWT tokens (`access` and `refresh` tokens).

#### **Request**:

- **Method**: `POST`
- **Endpoint**: `/login/`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```

#### **Response**:

- **Status**: `200 OK`
- **Response Body**:
  ```json
  {
    "access": "access_token_here",
    "refresh": "refresh_token_here"
  }
  ```

#### **Errors**:

- **Status**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "non_field_errors": ["Invalid email or password"]
    }
    ```

---

### **3. Logout (`POST /logout/`)**

#### **Description**:

Logs out the user by instructing the client to discard the JWT token (tokens are stateless, so no server-side session needs to be cleared).

#### **Request**:

- **Method**: `POST`
- **Endpoint**: `/logout/`
- **Authorization**: `Bearer <access_token>` (Add the access token in the `Authorization` header as a bearer token).

#### **Response**:

- **Status**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Successfully logged out"
  }
  ```

---

### **4. Admin Approval of Seller (`POST /admin/approve-seller/`)** _(Optional: For admin approval of sellers)_

#### **Description**:

This endpoint would be used by an **admin** to approve sellers who are registered but waiting for admin approval. For simplicity, this endpoint is optional and may not be required if you are handling approval in another manner (e.g., via the Django Admin interface).

#### **Request**:

- **Method**: `POST`
- **Endpoint**: `/admin/approve-seller/`
- **Request Body**:
  ```json
  {
    "user_id": 1
  }
  ```

#### **Response**:

- **Status**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Seller account approved."
  }
  ```

---

### **Authentication for Endpoints**

#### **JWT Authentication**:

- All endpoints except for **`/register/`** are protected and require the client to authenticate using the JWT access token.
- The access token is passed in the request header as a **Bearer token**.

#### **Example of Authorization Header**:

```http
Authorization: Bearer <your_jwt_access_token>
```

---

### **Permissions**

- **`/register/`**: No authentication is required. The user can register with email and password without needing a token.
- **`/login/`**: No authentication is required, as this endpoint is for logging in and retrieving JWT tokens.
- **`/logout/`**: Requires authentication via JWT token (`Bearer <access_token>`).
- **Admin Endpoints**: Require admin privileges to approve sellers or perform any admin-specific operations.

---

### **Response Status Codes**

- **201 Created**: Returned when a resource is successfully created (e.g., on successful user registration).
- **200 OK**: Returned when the operation is successful (e.g., on successful login or logout).
- **400 Bad Request**: Returned when the request data is invalid (e.g., missing required fields or invalid data).
- **401 Unauthorized**: Returned when authentication fails or the user does not have the necessary permissions.
- **404 Not Found**: Returned when the requested resource does not exist (e.g., an invalid URL or endpoint).
- **500 Internal Server Error**: Returned for server-side issues.

---

### **Full API URL Structure**

- **User Registration**: `/register/` (POST)
- **Login**: `/login/` (POST)
- **Logout**: `/logout/` (POST)
- **Admin Approval of Seller**: `/admin/approve-seller/` (POST)

---
