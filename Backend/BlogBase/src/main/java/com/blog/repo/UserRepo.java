package com.blog.repo;

import com.blog.entity.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<CustomUser, Long> {

    Optional<CustomUser> findByUsername(String username);

}
