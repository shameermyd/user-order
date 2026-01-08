# Machine Test – Microservice Architecture (NestJS)

This project implements a simple microservice-based system using **NestJS**.

It contains **two backend services**:
1. User Service
2. Order Service

The Order Service communicates with the User Service to validate users and fetch user details.

---

## Services Overview

### 1. User Service
- Manages user data
- Exposes REST APIs
- Uses MongoDB for data storage

**APIs**
- POST /users – Create a user
- GET /users/:id – Get user details

**Port**
- Runs on: http://localhost:3000

---

### 2. Order Service
- Manages orders
- Uses MongoDB for data storage
- Communicates with User Service using REST API

**APIs**
- POST /orders – Create an order (validates user)
- GET /orders/:id – Get order details with user info

**Port**
- Runs on: http://localhost:3002

---

## Tech Stack
- Node.js
- NestJS
- MongoDB
- Mongoose
- REST API
- Axios (NestJS HttpModule)

---

## Project Structure
machine-test/
├── user-service/
├── order-service/
└── README.md


