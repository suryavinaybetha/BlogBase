package com.blog.service;

import com.blog.dto.PublicResponse;
import com.blog.dto.UserResponse;
import com.blog.entity.Blog;
import com.blog.entity.CustomUser;
import com.blog.exception.ResourceNotFoundException;
import com.blog.repo.BlogRepo;
import com.blog.repo.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    private final UserRepo userRepo;
    private final BlogRepo blogRepo;

    public BlogService(UserRepo userRepo, BlogRepo blogRepo) {
        this.userRepo = userRepo;
        this.blogRepo = blogRepo;
    }

    public ResponseEntity<?> getAllBlogs() {
        List<Blog> all = blogRepo.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    public ResponseEntity<?> getBlogById(long blogId) {
        Optional<Blog> blog = blogRepo.findById(blogId);
        if (blog.isPresent()) {
            return new ResponseEntity<>(blog.get(), HttpStatus.OK);
        } else {
//            return new ResponseEntity<>("Blog not found with id: " + blogId, HttpStatus.NOT_FOUND);
            throw new ResourceNotFoundException("Blog Not Found");
        }
    }

    public ResponseEntity<?> addBlog(Blog blog, String username) {
        CustomUser user = userRepo.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
        blog.setUser(user);
        user.addBlog(blog);
        userRepo.save(user);
        return new ResponseEntity<>("Blog added to " + user.getUsername(), HttpStatus.CREATED);
    }

    public ResponseEntity<?> getBlogPublic(long blogId) {
        Blog blog = blogRepo.findById(blogId).orElseThrow(() -> new ResourceNotFoundException("Blog Not Found"));
        CustomUser customUser = userRepo.findUserByBlogId(blogId)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found for blogId: " + blogId));
        PublicResponse response = new PublicResponse(customUser, blog);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<?> getAllBlogsPublic(String username) {
        CustomUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found with username: " + username));
        return new ResponseEntity<>(new UserResponse(user), HttpStatus.OK);
    }
}
