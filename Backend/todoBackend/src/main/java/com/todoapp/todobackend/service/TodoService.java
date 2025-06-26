package com.todoapp.todobackend.service;
import com.todoapp.todobackend.dto.TodoRequest;
import com.todoapp.todobackend.dto.TodoResponse;
import com.todoapp.todobackend.entity.ToDoEntity;
import com.todoapp.todobackend.exception.TodoNotFoundException;
import com.todoapp.todobackend.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
@Service
@Transactional
public class TodoService {

    @Autowired
    private ToDoRepository todoRepository;

    public List<TodoResponse> getAllTodos() {
        return todoRepository.findAllOrderByCompletedAndCreatedAt()
                .stream()
                .map(TodoResponse::new)
                .collect(Collectors.toList());
    }

    public TodoResponse getTodoById(Long id) {
        ToDoEntity todo = todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException("Todo not found with id: " + id));
        return new TodoResponse(todo);
    }

    public TodoResponse createTodo(TodoRequest request) {
        ToDoEntity todo = new ToDoEntity();
        todo.setTitle(request.getTitle().trim());
        todo.setCompleted(request.getCompleted() != null ? request.getCompleted() : false);

        ToDoEntity savedTodo = todoRepository.save(todo);
        return new TodoResponse(savedTodo);
    }

    public TodoResponse updateTodo(Long id, TodoRequest request) {
        ToDoEntity todo = todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException("Todo not found with id: " + id));

        todo.setTitle(request.getTitle().trim());
        todo.setCompleted(request.getCompleted());

        ToDoEntity updatedTodo = todoRepository.save(todo);
        return new TodoResponse(updatedTodo);
    }

    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new TodoNotFoundException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }

    public List<TodoResponse> getTodosByStatus(Boolean completed) {
        return todoRepository.findByCompletedOrderByCreatedAtDesc(completed)
                .stream()
                .map(TodoResponse::new)
                .collect(Collectors.toList());
    }

    public long getTodoCount(Boolean completed) {
        return todoRepository.countByCompleted(completed);
    }
}