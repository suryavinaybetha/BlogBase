package com.blog.dto;

import com.blog.entity.Blog;
import com.blog.entity.CustomUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicResponse {

    // This class is the response for getting a single published blog

    List<Blog> blogs = new ArrayList<>();
    private String username;
    private String firstName;
    private String lastName;
    private String email;

    public PublicResponse(CustomUser customUser, Blog blog) {

        this.username = customUser.getUsername();
        this.firstName = customUser.getFirstName();
        this.lastName = customUser.getLastName();
        this.email = customUser.getEmail();
        this.blogs.add(blog);

    }
}
