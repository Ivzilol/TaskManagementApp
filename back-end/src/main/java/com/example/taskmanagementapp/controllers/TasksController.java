package com.example.taskmanagementapp.controllers;

import com.example.taskmanagementapp.model.dto.CreateTaskDTO;
import com.example.taskmanagementapp.model.entity.Tasks;
import com.example.taskmanagementapp.model.entity.Users;
import com.example.taskmanagementapp.service.ReportTaskService;
import com.example.taskmanagementapp.service.TasksService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/tasks")
public class TasksController {

    private final TasksService tasksService;

    public TasksController(TasksService tasksService) {
        this.tasksService = tasksService;
    }

    @PostMapping("")
    public ResponseEntity<Tasks> createTask(@RequestBody CreateTaskDTO createTaskDTO,
                                            @AuthenticationPrincipal Users user) {
        Tasks task = this.tasksService.createTask(createTaskDTO, user);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getTasks(@AuthenticationPrincipal Users user) {
        Set<Tasks> userTasks = tasksService.findByUser(user);
        return ResponseEntity.ok(userTasks);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getTask(@PathVariable Long taskId) {
        Optional<Tasks> taskById = tasksService.findById(taskId);
        return ResponseEntity.ok(taskById);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable Long taskId,
                                        @RequestBody Tasks task) {
        Tasks updatedTask = tasksService.updateTask(task);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        tasksService.delete(taskId);
        return (ResponseEntity<?>) ResponseEntity.ok();
    }

    @GetMapping("/download")
    private ResponseEntity<?> generateExcel(@AuthenticationPrincipal Users user) {
        Set<Tasks> tasks = this.tasksService.findByUser(user);
        return ResponseEntity.ok(tasks);
    }
}
