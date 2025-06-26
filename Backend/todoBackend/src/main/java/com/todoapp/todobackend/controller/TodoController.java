package com.todoapp.todobackend.controller;
import com.todoapp.todobackend.dto.TodoRequest;
import com.todoapp.todobackend.dto.TodoResponse;
import com.todoapp.todobackend.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
// Additional CORS annotation as backup (Method 2)
@CrossOrigin(
        origins = {"http://localhost:5173", "http://localhost:3001", "http://127.0.0.1:3000"},
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
        allowedHeaders = "*",
        allowCredentials = "true",
        maxAge = 3600
)
public class TodoController {
    @Autowired
    private TodoService todoService;

    // GET all todos
    @GetMapping
    public ResponseEntity<List<TodoResponse>> getAllTodos() {
        List<TodoResponse> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    // GET todos by status
    @GetMapping("/status/{completed}")
    public ResponseEntity<List<TodoResponse>> getTodosByStatus(@PathVariable Boolean completed) {
        List<TodoResponse> todos = todoService.getTodosByStatus(completed);
        return ResponseEntity.ok(todos);
    }

    // GET todo count
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getTodoCount() {
        Map<String, Long> count = new HashMap<>();
        count.put("total", todoService.getTodoCount(null));
        count.put("completed", todoService.getTodoCount(true));
        count.put("pending", todoService.getTodoCount(false));
        return ResponseEntity.ok(count);
    }

    // GET todo by id
    @GetMapping("/{id}")
    public ResponseEntity<TodoResponse> getTodoById(@PathVariable Long id) {
        TodoResponse todo = todoService.getTodoById(id);
        return ResponseEntity.ok(todo);
    }

    // POST create new todo
    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(@Valid @RequestBody TodoRequest request) {
        TodoResponse createdTodo = todoService.createTodo(request);
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    // PUT update todo
    @PutMapping("/{id}")
    public ResponseEntity<TodoResponse> updateTodo(@PathVariable Long id,
                                                   @Valid @RequestBody TodoRequest request) {
        TodoResponse updatedTodo = todoService.updateTodo(id, request);
        return ResponseEntity.ok(updatedTodo);
    }

    // DELETE todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Todo deleted successfully");
        return ResponseEntity.ok(response);
    }

    // OPTIONS for preflight requests (additional CORS support)
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build();
    }
}