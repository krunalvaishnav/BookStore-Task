# BookStore-Task

This project is a RESTful API built using **Node.js** and **Express** that supports:

- JWT-based Authentication
- CRUD operations for books
- Serch By Genre
- File-based data persistence using JSON files
- Protected routes
- Postman support
  

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/krunalvaishnav/BookStore-Task.git

cd BookStore-Task
```

### 2. Install Dependencies

```bash
 npm install
```

### 3. Configure Environment Variables

#### Create a .env file in the root folder:

```bash
PORT_BACKEND=5000
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server

```bash
npm run server
```

## How to test endpoints

Postman Workspaces URL:
```bash
https://www.postman.com/flight-meteorologist-55084970/workspace/bookstore-task/collection/40867548-b5983d8b-aa87-4e3a-b9f9-07377da042a8?action=share&creator=40867548
```

### Register

```bash
 POST /api/register
```

Request Body json:

```bash
{
"email": "user@gmail.com",
"password": "123456"
}
```

Response like this:

```bash
{
    "message": "User register successfully"
}
```

### Login

```bash
POST /api/login
```

Request Body json:

```bash
{
"email": "user@gmail.com",
"password": "123456"
}
```

Response like this:

```bash
{
    "message": "User login successfully",
    "token": "your.jwt.token"
}
```

> Now add this token in the Authorization Bearer Token value for all `/api/books` endpoints:

## Book Routes (/api/books)

> All routes require a valid JWT token in the `Authorization` header.

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| GET    | `/api/books`     | List books                 |
| GET    | `/api/books/:id` | Get a book by ID           |
| POST   | `/api/books`     | Add a new book             |
| PUT    | `/api/books/:id` | Update a book (only owner) |
| DELETE | `/api/books/:id` | Delete a book (only owner) |
| GET    | `/api/books/serch?genre=` | Filter books by genre |
