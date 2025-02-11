# Mindset Institute Case - Microservices Architecture

This project is a **Node.js microservices** application built with **Express.js** and **MongoDB**, following a
containerized architecture using **Docker Compose**. It consists of two main services:

- **User Management Service** (`user-management`) – Handles user authentication and management.
- **Customer Management Service** (`customer-management`) – Manages customer data.
- **Customer Management Service** (`sales-tracking`) – Tracks sale statuses with pipelines.
- **MongoDB** – NoSQL database used by all services.

Each service is documented with **Swagger** and tested using **Jest & Supertest**.

---

## 🛠️ Setup & Installation

### Prerequisites

Ensure you have the following installed:

- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [Node.js & npm](https://nodejs.org/en/)

### Run the Application

### 1️⃣ Clone the repository:
   ```sh
   git clone https://github.com/your-repo/mindset-institute-case.git
   cd mindset-institute-case
   ```

### 2️⃣ Start the application using Docker Compose:

   ```sh
   docker-compose up --build
   ```
### 3️⃣ Access the Services via API Gateway

The API Gateway runs on **`http://localhost:8080`** and routes requests to the appropriate microservices:

- **User Management Service:** `http://localhost:8080/users`
- **Customer Management Service:** `http://localhost:8080/customers`
- **Sales Tracking Service:** `http://localhost:8080/sales`

### 4️⃣ Swagger API Documentation

Access the **Swagger UI** for API documentation at:

- 📜 **API Docs:** [`http://localhost:8080/api-docs`](http://localhost:8080/api-docs)
