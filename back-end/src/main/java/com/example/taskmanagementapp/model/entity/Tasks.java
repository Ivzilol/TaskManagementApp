package com.example.taskmanagementapp.model.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Tasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String priority;

    @Column(nullable = false, name = "start_date")
    private LocalDate startDateTask;

    @Column(nullable = false, name = "end_date")
    private LocalDate endDateTask;

    @ManyToOne
    private Users users;

    public Tasks() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDate getStartDateTask() {
        return startDateTask;
    }

    public void setStartDateTask(LocalDate startDateTask) {
        this.startDateTask = startDateTask;
    }

    public LocalDate getEndDateTask() {
        return endDateTask;
    }

    public void setEndDateTask(LocalDate endDateTask) {
        this.endDateTask = endDateTask;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}
