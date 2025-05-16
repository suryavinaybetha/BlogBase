package com.blog.controller;

import com.blog.dto.UserRequest;
import com.blog.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> addUser(@RequestBody UserRequest user) {
        return userService.addUser(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("")
    public ResponseEntity<?> getAllUsers() {
        return userService.getAllUsers();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/deactivate/{userId}")
    public ResponseEntity<?> deactivateUser(@PathVariable Long userId) {
        return userService.deactivateUser(userId);
    }

    @PreAuthorize("hasRole('BASICUSER') or hasRole('ADMIN')")
    @GetMapping("/login")
    public ResponseEntity<?> getSelf(Principal principal) {
        return userService.getSelf(principal.getName());
    }
}
