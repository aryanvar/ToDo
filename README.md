# Todo App – Full Stack Application

A full-stack Todo application built using Spring Boot, React (Vite), and PostgreSQL. This project demonstrates complete CRUD operations, a service-layer backend architecture, and a responsive, modern frontend interface.

---

## Tech Stack

| Layer      | Technologies                                      |
|------------|---------------------------------------------------|
| Backend    | Java 17, Spring Boot 3.2, Maven                   |
| Frontend   | React (Vite), Axios, CSS3, Node.js 20.19.0        |
| Database   | PostgreSQL                                        |

---

## Features

- Create, Read, Update, Delete (CRUD) todos
- Toggle completion status
- Filter by All / Pending / Completed
- Input validation and error handling
- RESTful API with proper HTTP status codes
- Service-layer architecture for clean separation of concerns

---

## Database Setup (PostgreSQL)

``sql
-- Create the database
CREATE DATABASE todoapp;

-- Connect to the database
\c todoapp;

-- Create the todos table
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## 2.Backend
# cd backend
# Update application.properties with your DB credentials
# Runs on http://localhost:8080

## 3. Frontend
# bashcd frontend
# npm install
# npm install axios
# npm start
# Runs on http://localhost:5173


📋 API Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | `/api/todos`      | Retrieve all todos      |
| POST   | `/api/todos`      | Create a new todo       |
| PUT    | `/api/todos/{id}` | Update an existing todo |
| DELETE | `/api/todos/{id}` | Delete a todo by ID     |


## 4.Usage

Add Todo: Type in input field and click "Add"
Edit: Click "Edit" button, modify, then "Save"
Complete: Click on todo title to toggle status
Delete: Click "Delete" and confirm
Filter: Use filter buttons to view All/Pending/Completed

