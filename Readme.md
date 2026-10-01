
# Microservices Data Aggregation

## 1. Overview

This project demonstrates a simple microservices architecture using **Node.js and Express.js**.

The application consists of two independent microservices:

- **User Service** – Provides user profile information.
- **Order Service** – Provides order information and aggregates user details with the user's order history.

The services run independently on different ports and communicate using HTTP REST APIs.

---

## 2. Technologies Used

- Node.js
- Express.js
- JavaScript
- REST API
- HTTP
- Postman

The project uses static in-memory data instead of a database.

---

## 3. Project Structure

```text
microservices-data-aggregation/
│
├── user-service/
│   ├── server.js
│   ├── users.js
│   ├── package.json
│   └── package-lock.json
│
├── order-service/
│   ├── server.js
│   ├── orders.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

### User Service

```text
server.js → API and service logic
users.js  → Static user data
```

### Order Service

```text
server.js → API, order logic, and data aggregation
orders.js  → Static order data
```

---

## 4. Architecture

```text
                    Postman / Client
                           |
              +------------+------------+
              |                         |
              v                         v
      User Service              Order Service
       Port 3001                 Port 3002
              ^                         |
              |                         |
              +------ HTTP Request -----+
                        |
                 User Information
                        |
                        v
                 Data Aggregation
                        |
                        v
                Combined Response
```

The **Order Service** communicates with the **User Service** to retrieve user details and combines them with the corresponding order history.

---

## 5. Setup and Installation

### Prerequisites

Install:

- Node.js
- npm
- Postman

Check the installation:

```bash
node --version
npm --version
```

### Install User Service Dependencies

```bash
cd user-service
npm install
```

### Install Order Service Dependencies

Open another terminal:

```bash
cd order-service
npm install
```

---

## 6. Running the Services

### Start User Service

```bash
cd user-service
node server.js
```

Runs on:

```text
http://localhost:3001
```

### Start Order Service

Open a separate terminal:

```bash
cd order-service
node server.js
```

Runs on:

```text
http://localhost:3002
```

Both services must be running for the aggregation endpoint to work.

---

## 7. API Endpoints

### User Service

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | `/users`     | Get all users    |
| GET    | `/users/:id` | Get a user by ID |

Example:

```text
GET http://localhost:3001/users/1
```

---

### Order Service

| Method | Endpoint                    | Description                               |
| ------ | --------------------------- | ----------------------------------------- |
| GET    | `/orders`                 | Get all orders                            |
| GET    | `/orders/:userId`         | Get orders for a user                     |
| GET    | `/orders/:userId/summary` | Get aggregated user and order information |

Examples:

```text
GET http://localhost:3002/orders
```

```text
GET http://localhost:3002/orders/1
```

---

## 8. Data Aggregation

The main functionality is:

```text
GET http://localhost:3002/orders/1/summary
```

The request is handled by the Order Service.

### Flow

```text
1. Client requests Order Service
             |
             v
2. Order Service receives userId
             |
             v
3. Order Service sends HTTP request
   to User Service
             |
             v
4. User Service returns user details
             |
             v
5. Order Service retrieves user's orders
             |
             v
6. User details + orders are combined
             |
             v
7. Aggregated response is returned
```

### Example Response

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "orders": [
    {
      "orderId": 101,
      "userId": 1,
      "item": "Laptop",
      "price": 55000
    },
    {
      "orderId": 102,
      "userId": 1,
      "item": "Mouse",
      "price": 1200
    }
  ]
}
```

---

## 9. Postman Testing

The following requests should be tested in Postman.

### Test 1 – User Service

```text
GET http://localhost:3001/users
```

### Test 2 – Individual User

```text
GET http://localhost:3001/users/1
```

### Test 3 – Order Service

```text
GET http://localhost:3002/orders
```

### Test 4 – User's Orders

```text
GET http://localhost:3002/orders/1
```

### Test 5 – Aggregated Response

```text
GET http://localhost:3002/orders/1/summary
```

The final request demonstrates communication between the two microservices and the aggregation of user and order data.

---

## 10. External Resources

The following documentation/resources were used:

- Node.js Documentation
- Express.js Documentation
- Postman Documentation
