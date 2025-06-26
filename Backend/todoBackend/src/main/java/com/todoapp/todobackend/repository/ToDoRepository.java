package com.todoapp.todobackend.repository;

import com.todoapp.todobackend.entity.ToDoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToDoRepository extends JpaRepository<ToDoEntity,Long> {
    List<ToDoEntity> findByCompletedOrderByCreatedAtDesc(Boolean completed);

    @Query("SELECT t FROM ToDoEntity t ORDER BY t.completed ASC, t.createdAt DESC")
    List<ToDoEntity> findAllOrderByCompletedAndCreatedAt();

    long countByCompleted(Boolean completed);
}
