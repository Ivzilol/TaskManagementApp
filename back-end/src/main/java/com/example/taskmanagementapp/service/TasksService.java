package com.example.taskmanagementapp.service;

import com.example.taskmanagementapp.model.dto.CreateTaskDTO;
import com.example.taskmanagementapp.model.entity.Tasks;
import com.example.taskmanagementapp.model.entity.Users;
import com.example.taskmanagementapp.model.enums.AuthorityEnum;
import com.example.taskmanagementapp.repository.TasksRepository;
import com.example.taskmanagementapp.repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

@Service
public class TasksService {

    private final TasksRepository tasksRepository;

    private final UsersRepository usersRepository;

    public TasksService(TasksRepository tasksRepository, UsersRepository usersRepository) {
        this.tasksRepository = tasksRepository;
        this.usersRepository = usersRepository;
    }

    public Tasks createTask(CreateTaskDTO createTaskDTO, Users user) {
        Tasks newTask = new Tasks();
        newTask.setTitle(createTaskDTO.getTitle());
        newTask.setDescription(createTaskDTO.getDescription());
        newTask.setPriority(createTaskDTO.getPriority());
        LocalDate startDate = LocalDate.parse(createTaskDTO.getStartDate());
        LocalDate endDate = LocalDate.parse(createTaskDTO.getEndDate());
        newTask.setStartDateTask(startDate);
        newTask.setEndDateTask(endDate);
        Optional<Users> currentUser = this.usersRepository.findByUsername(user.getUsername());
        newTask.setUsers(currentUser.get());
        this.tasksRepository.save(newTask);
        return newTask;
    }

    public Set<Tasks> findByUser(Users user) {
        boolean isAdmin = isAdmin(user);
        if (isAdmin) {
            return tasksRepository.findByAdmin(user);
        } else {
            return tasksRepository.findByUsers_Id(user.getId());
        }
    }

    private boolean isAdmin(Users user) {
        return user.getAuthorities()
                .stream().anyMatch(auth -> AuthorityEnum.admin.name().equals(auth.getAuthority()));
    }

    public Optional<Tasks> findById(Long taskId) {
        return tasksRepository.findById(taskId);
    }

    public Tasks updateTask(Tasks task) {
        return this.tasksRepository.save(task);
    }

    public void delete(Long taskId) {
        tasksRepository.deleteById(taskId);
    }


}
