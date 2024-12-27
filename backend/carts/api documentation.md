To test the cart feature using Postman, you can follow the steps below:

---

### **1. Setup Postman Environment**

- Add a base URL for your API (e.g., `http://127.0.0.1:8000/carts/`).
- Include an **Authorization** header in your requests with a valid **Bearer Token** (if using token-based authentication).

---

### **2. Test Cases**

#### **2.1. View Cart**

- **Method**: `GET`
- **URL**: `/carts/`
- **Headers**:
  - Authorization: `Bearer <your_token>`
- **Expected Response** (example):

```json
{
  "id": 1,
  "user": 1,
  "items": [
    {
      "id": 1,
      "product": {
        "id": 101,
        "name": "Product 1",
        "price": "50.00",
        "description": "Example product"
      },
      "quantity": 2
    }
  ],
  "total_price": "100.00"
}
```

---

#### **2.2. Add to Cart**

- **Method**: `POST`
- **URL**: `/carts/cart/add/`
- **Headers**:
  - Authorization: `Bearer <your_token>`
  - Content-Type: `application/json`
- **Body**:

```json
{
  "product_id": 101,
  "quantity": 2
}
```

- **Expected Response**:

```json
{
  "detail": "Product added to cart."
}
```

---

#### **2.3. Remove from Cart**

- **Method**: `DELETE`
- **URL**: `/carts/remove/<cart_item_id>/`
  - Replace `<cart_item_id>` with the `id` of the item in the cart (e.g., `/carts/remove/1/`).
- **Headers**:
  - Authorization: `Bearer <your_token>`
- **Expected Response**:

```json
{
  "detail": "Product removed from cart."
}
```

---
