package com.blog.dto;

import com.blog.entity.Blog;
import com.blog.entity.CustomUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

//    This class is the response for multiple published blog for a single user and
//    also when a user logs in

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
        if (customUser.getBlogs() != null) {
            List<Blog> sortedBlogs = new ArrayList<Blog>(customUser.getBlogs());
            sortedBlogs.sort(Comparator.comparingLong(Blog::getId).reversed());
            this.blogs = sortedBlogs;
        } else {
            this.blogs = new ArrayList<>();
        }
    }
}
