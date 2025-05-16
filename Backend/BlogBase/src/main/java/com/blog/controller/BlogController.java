package com.blog.controller;

import com.blog.entity.Blog;
import com.blog.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{blogId}")
    public ResponseEntity<?> getBlogById(@PathVariable long blogId) {
        return blogService.getBlogById(blogId);
    }

    @PreAuthorize("hasRole('BASICUSER')")
    @PostMapping("/addBlog")
    public ResponseEntity<?> addBlogToUser(@RequestBody Blog blog, Principal principal) {
        return blogService.addBlog(blog, principal.getName());
    }

    @GetMapping("/getBlog/{blogId}/public")
    public ResponseEntity<?> getBlogPublic(@PathVariable long blogId) {
        return blogService.getBlogPublic(blogId);
    }

    @GetMapping("/getAllBlogs/{username}/public")
    public ResponseEntity<?> getAllBlogsPublic(@PathVariable String username) {
        return blogService.getAllBlogsPublic(username);
    }

}
