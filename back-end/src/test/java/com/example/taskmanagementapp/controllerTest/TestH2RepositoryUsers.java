package com.example.taskmanagementapp.controllerTest;

import com.example.taskmanagementapp.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestH2RepositoryUsers extends JpaRepository<Users, Long> {

}
