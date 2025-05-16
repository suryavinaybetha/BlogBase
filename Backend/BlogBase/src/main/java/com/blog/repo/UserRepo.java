package com.blog.repo;

import com.blog.entity.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepo extends JpaRepository<CustomUser, Long> {

    Optional<CustomUser> findByUsername(String username);

    @Query("SELECT b.user FROM Blog b WHERE b.id = :blogId")
    Optional<CustomUser> findUserByBlogId(@Param("blogId") Long blogId);
}
