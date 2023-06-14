package com.example.taskmanagementapp.repository;

import com.example.taskmanagementapp.model.entity.Tasks;
import com.example.taskmanagementapp.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.io.InputStream;
import java.util.List;
import java.util.Set;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Long> {

    @Query("select t from Tasks as t")
    Set<Tasks> findByAdmin(Users user);
    @Query("select t from Tasks as t" +
            " where t.users.id = :id")
    Set<Tasks> findByUsers_Id(Long id);
    @Query("select t from Tasks as t" +
            " where t.users.id = :id")
    List<Tasks> findAllTasks(Long id);

}
