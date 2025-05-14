package com.blog.dto;

import com.blog.entity.Blog;
import com.blog.entity.CustomUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private List<Blog> blogs;

    public UserResponse(CustomUser customUser) {
        this.username = customUser.getUsername();
        this.firstName = customUser.getFirstName();
        this.lastName = customUser.getLastName();
        this.email = customUser.getEmail();
        this.blogs = customUser.getBlogs();
    }
}
