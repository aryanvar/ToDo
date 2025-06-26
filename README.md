Todo App - Full Stack Application
Overview
A full-stack Todo application built with Spring Boot, React, and PostgreSQL. Features complete CRUD operations, service layer architecture, and modern UI.

Tech Stack
Backend: Java 17, Spring Boot 3.2, PostgreSQL, Maven
Frontend: ReactVite, Axios, CSS3 , Node 20.19.0
Database: PostgreSQL

Features
Create, read, update, delete todos
Toggle completion status
Filter by status (All/Pending/Completed)
Input validation & error handling
RESTful API with proper HTTP status codes
Service layer architecture

1. Database
sqlCREATE DATABASE todoapp;
\c todoapp;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2.Backend
cd backend
# Update application.properties with your DB credentials
# Runs on http://localhost:8080

3. Frontend
bashcd frontend
npm install
npm install axios
npm start

📋 API Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | `/api/todos`      | Retrieve all todos      |
| POST   | `/api/todos`      | Create a new todo       |
| PUT    | `/api/todos/{id}` | Update an existing todo |
| DELETE | `/api/todos/{id}` | Delete a todo by ID     |


Usage

Add Todo: Type in input field and click "Add"
Edit: Click "Edit" button, modify, then "Save"
Complete: Click on todo title to toggle status
Delete: Click "Delete" and confirm
Filter: Use filter buttons to view All/Pending/Completed

