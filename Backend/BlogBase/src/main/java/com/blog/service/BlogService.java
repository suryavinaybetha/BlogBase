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

import java.util.ArrayList;
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

    private boolean isNumeric(String str) {
        return str.matches("\\d+"); // Matches only digits
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
        if (!blog.getIsPublished()) {
            return new ResponseEntity<>("Blog is not published", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        CustomUser customUser = userRepo.findUserByBlogId(blogId)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found for blogId: " + blogId));
        PublicResponse response = new PublicResponse(customUser, blog);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<?> getAllBlogsPublic(String identifier) {
        CustomUser user = new CustomUser();
        if (!isNumeric(identifier)) {
            user = userRepo.findByUsername(identifier)
                    .orElseThrow(() -> new ResourceNotFoundException("User Not Found with username: " + identifier));
            List<Blog> allBlogs = user.getBlogs();
            List<Blog> publishedBlogs = new ArrayList<>();
            for (Blog blog : allBlogs) {
                if (blog.getIsPublished()) {
                    publishedBlogs.add(blog);
                }
            }
            user.setBlogs(publishedBlogs);
            return new ResponseEntity<>(new UserResponse(user), HttpStatus.OK);
        } else {
            return getBlogPublic(Long.parseLong(identifier));
        }
    }

    public ResponseEntity<?> updateBlog(Blog blog, String username) {
        Blog existingBlog = blogRepo.findById(blog.getId()).orElseThrow(() -> new ResourceNotFoundException("Blog Not Found"));
        existingBlog.setTitle(blog.getTitle());
        existingBlog.setContent(blog.getContent());
        blogRepo.save(existingBlog);
        return new ResponseEntity<>("Blog updated successfully", HttpStatus.OK);
    }

    public ResponseEntity<?> publishBlog(Long blogId) {
        Blog existingBlog = blogRepo.findById(blogId).orElseThrow(() -> new ResourceNotFoundException("Blog Not Found"));
        existingBlog.setIsPublished(true);
        blogRepo.save(existingBlog);
        return new ResponseEntity<>("Blog published successfully", HttpStatus.OK);
    }

    public ResponseEntity<?> unPublishBlog(Long blogId) {
        Blog existingBlog = blogRepo.findById(blogId).orElseThrow(() -> new ResourceNotFoundException("Blog Not Found"));
        existingBlog.setIsPublished(false);
        blogRepo.save(existingBlog);
        return new ResponseEntity<>("Blog un-published successfully", HttpStatus.OK);
    }

    public ResponseEntity<?> deleteBlog(Long blogId, String name) {
        Blog existingBlog = blogRepo.findById(blogId).orElseThrow(() -> new ResourceNotFoundException("Blog Not Found"));
        blogRepo.delete(existingBlog);
        return new ResponseEntity<>("Blog deleted successfully", HttpStatus.OK);
    }
}
