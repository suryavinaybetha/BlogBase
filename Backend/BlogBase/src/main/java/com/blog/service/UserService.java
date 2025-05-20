package com.blog.service;

import com.blog.dto.UserRequest;
import com.blog.dto.UserResponse;
import com.blog.entity.Blog;
import com.blog.entity.CustomUser;
import com.blog.exception.ResourceNotFoundException;
import com.blog.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepo repo;
    private final PasswordEncoder encoder;

    public UserService(UserRepo repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Transactional
    public ResponseEntity<?> addUser(UserRequest user) {
        CustomUser addUser = new CustomUser(user);
        addUser.setPassword(encoder.encode(addUser.getPassword()));
        CustomUser save = repo.save(addUser);
        return new ResponseEntity<>(new UserResponse(save), HttpStatus.CREATED);
    }

    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<?> getAllUsersPublic() {
        List<CustomUser> all = repo.findAll();
        List<UserResponse> users = new ArrayList<>();
        for (CustomUser u : all) {
            List<Blog> publishedBlogs = new ArrayList<>();
            List<Blog> allBlogs = u.getBlogs();
            for (Blog blog : allBlogs) {
                if (blog.getIsPublished()) {
                    publishedBlogs.add(blog);
                }
            }
            if (publishedBlogs.isEmpty()) continue;
            u.setBlogs(publishedBlogs);
            UserResponse userResponse = new UserResponse(u);
            users.add(userResponse);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
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
