package com.blog.entity;

import com.blog.dto.UserRequest;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CustomUser {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = true)
    private String username;
    private String password;
    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;
    private String userType = "BASICUSER";
    private Boolean isActive = true;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Blog> blogs;

    public CustomUser(UserRequest request) {
        this.username = request.getUsername();
        this.password = request.getPassword();
        this.firstName = request.getFirstName();
        this.lastName = request.getLastName();
        this.email = request.getEmail();
    }

    public void addBlog(Blog blog) {
        blog.setUser(this);
        this.blogs.add(blog);
    }

}
