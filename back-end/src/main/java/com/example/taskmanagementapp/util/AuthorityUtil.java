package com.example.taskmanagementapp.util;

import com.example.taskmanagementapp.model.entity.Users;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public class AuthorityUtil {
    public static Boolean hasRole(String role, Users user) {
        return user.getAuthorities()
                .stream().anyMatch(auth -> auth.getAuthority().equals(role));
    }
}
