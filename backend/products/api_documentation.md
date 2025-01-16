### Product API Documentation

---

### 1. **Get List of Products**
**Endpoint:** `GET /products/`

**Description:**  
Fetches a list of all available products.

**Permissions:**  
- Public access (No authentication required)

**Response Example:**
```json
[
    {
        "id": 1,
        "name": "Product 1",
        "description": "This is product 1",
        "price": 100.0,
        "category": "Category 1",
        "stock_quantity": 50,
        "image_url": "http://example.com/product1.jpg",
        "created_at": "2024-12-20T10:00:00Z",
        "user": 1
    },
    ...
]
```


---

### 2. **Create Product**  
**Endpoint:** `POST /products/create/`

**Description:**  
Create a new product (only accessible to sellers).

**Permissions:**  
- `IsAuthenticated` and `IsSeller` permission required

**Request Body Example:**
```json
{
    "name": "New Product",
    "description": "Description of new product",
    "price": 200.0,
    "category": "Category 2",
    "stock_quantity": 30,
    "image_url": "http://example.com/newproduct.jpg"
}
```

**Response Example:**
```json
{
    "id": 2,
    "name": "New Product",
    "description": "Description of new product",
    "price": 200.0,
    "category": "Category 2",
    "stock_quantity": 30,
    "image_url": "http://example.com/newproduct.jpg",
    "created_at": "2024-12-20T12:30:00Z",
    "user": 1
}
```

---

### 3. **View Product Details**  
**Endpoint:** `GET /products/{id}/`

**Description:**  
Fetch the details of a specific product by ID.


**Permissions:**  
- Public access (No authentication required)

**Response Example:**
```json
{
    "id": 1,
    "name": "Product 1",
    "description": "This is product 1",
    "price": 100.0,
    "category": "Category 1",
    "stock_quantity": 50,
    "image_url": "http://example.com/product1.jpg",
    "created_at": "2024-12-20T10:00:00Z",
    "user": 1
}
```

---

### 4. **Update Product**  
**Endpoint:** `PUT /products/{id}/update/`

**Description:**  
Update a specific product by ID (only for the owner/seller).

**Permissions:**  
- `IsAuthenticated` and `IsSellerOrOwner` permission required

**Request Body Example:**
```json

{
    "name": "Updated Product",
    "description": "Updated description of product",
    "price": 150.0,
    "category": "Category 1",
    "stock_quantity": 40,
    "image_url": "http://example.com/updatedproduct.jpg"
}
```

**Response Example:**
```json
{
    "id": 1,
    "name": "Updated Product",
    "description": "Updated description of product",
    "price": 150.0,
    "category": "Category 1",
    "stock_quantity": 40,
    "image_url": "http://example.com/updatedproduct.jpg",
    "created_at": "2024-12-20T10:00:00Z",
    "user": 1
}
```

---

### 5. **Delete Product**  
**Endpoint:** `DELETE /products/{id}/delete/`

**Description:**  
Delete a specific product by ID (only for the owner/seller).

**Permissions:**  
- `IsAuthenticated` and `IsSellerOrOwner` permission required

**Response Example:**
```json
{
    "message": "Product deleted successfully."
}
```

---

### Error Responses

1. **Unauthorized Access (403 Forbidden)**  
   For operations restricted to sellers:
   ```json
   {
       "detail": "Only sellers can create products."
   }
   ```

2. **Product Not Found (404 Not Found)**  
   If the product ID does not exist:
   ```json
   {
       "detail": "Product not found."
   }
   ```

3. **Validation Error (400 Bad Request)**  
   For invalid or missing required fields:
   ```json
   {
       "price": ["Price must be a positive number."],
       "stock_quantity": ["Stock quantity cannot be negative."]
   }
   ```

---
