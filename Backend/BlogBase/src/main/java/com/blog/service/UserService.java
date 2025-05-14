package com.blog.service;

import com.blog.dto.UserRequest;
import com.blog.dto.UserResponse;
import com.blog.entity.CustomUser;
import com.blog.exception.ResourceNotFoundException;
import com.blog.repo.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepo repo;
    private final PasswordEncoder encoder;

    public UserService(UserRepo repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public ResponseEntity<?> addUser(UserRequest user) {
        CustomUser addUser = new CustomUser(user);
        addUser.setPassword(encoder.encode(addUser.getPassword()));
        return new ResponseEntity<>(repo.save(addUser).getId(), HttpStatus.CREATED);
    }

    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<?> getUserById(Long userId) {
        CustomUser user = repo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found wth id: " + userId));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    public ResponseEntity<?> deactivateUser(Long userId) {
        CustomUser user = repo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found wth id: " + userId));
        user.setIsActive(false);
        repo.save(user);
        return new ResponseEntity<>("User deactivated with the id: " + userId, HttpStatus.OK);
    }

    public ResponseEntity<?> getSelf(String username) {
        CustomUser customUser = repo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return new ResponseEntity<>(new UserResponse(customUser), HttpStatus.OK);
    }
}
