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

    @PreAuthorize("hasRole('BASICUSER')")
    @PostMapping("/updateBlog")
    public ResponseEntity<?> updateBlogOfUser(@RequestBody Blog blog, Principal principal) {
        return blogService.updateBlog(blog, principal.getName());
    }

    @PreAuthorize("hasRole('BASICUSER')")
    @DeleteMapping("/deleteBlog/{blogId}")
    public ResponseEntity<?> deleteBlogOfUser(@PathVariable Long blogId, Principal principal) {
        return blogService.deleteBlog(blogId, principal.getName());
    }

    @PreAuthorize("hasRole('BASICUSER')")
    @PutMapping("/publishBlog/{blogId}")
    public ResponseEntity<?> publishBlogOfUser(@PathVariable Long blogId) {
        return blogService.publishBlog(blogId);
    }

    @PreAuthorize("hasRole('BASICUSER')")
    @PutMapping("/unPublishBlog/{blogId}")
    public ResponseEntity<?> unPublishBlogOfUser(@PathVariable Long blogId) {
        return blogService.unPublishBlog(blogId);
    }

//    @GetMapping("/getBlog/{blogId}/public")
//    public ResponseEntity<?> getBlogPublic(@PathVariable long blogId) {
//        return blogService.getBlogPublic(blogId);
//    }

    @GetMapping("/getBlog/{identifier}/public")
    public ResponseEntity<?> getAllBlogsPublic(@PathVariable String identifier) {
        return blogService.getAllBlogsPublic(identifier);
    }

}
