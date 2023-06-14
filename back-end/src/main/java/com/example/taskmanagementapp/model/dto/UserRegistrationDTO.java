package com.example.taskmanagementapp.model.dto;

import com.example.taskmanagementapp.validation.annotation.UniqueEmail;
import com.example.taskmanagementapp.validation.annotation.UniqueUsername;
import com.unboundid.util.NotNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserRegistrationDTO {

    @UniqueUsername
    @Size(min = 3, max = 20, message = "Username length must be between 3 and 20 characters")
    @NotNull
    private String Username;

    @Size(min = 3, max = 20, message = "Password length must be between 3 and 20 characters")
    @NotNull
    private String password;

    @Size(min = 3, max = 20, message = "Password length must be between 3 and 20 characters")
    @NotNull
    private String confirmPassword;

    @UniqueEmail
    @Email(message = "Email cannot be empty")
    @NotBlank(message = "Email cannot be empty")
    private String email;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    public UserRegistrationDTO() {
    }

    public UserRegistrationDTO(String username, String password, String confirmPassword, String email, String firstName, String lastName) {
        Username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
