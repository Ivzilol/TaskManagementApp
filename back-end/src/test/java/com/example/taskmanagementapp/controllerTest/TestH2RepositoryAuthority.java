package com.example.taskmanagementapp.controllerTest;

import com.example.taskmanagementapp.model.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestH2RepositoryAuthority extends JpaRepository<Authority, Long> {

}
