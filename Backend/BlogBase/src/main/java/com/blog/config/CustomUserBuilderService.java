package com.blog.config;

import com.blog.entity.CustomUser;
import com.blog.exception.ResourceNotFoundException;
import com.blog.repo.UserRepo;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//@EnableMethodSecurity
@Service
public class CustomUserBuilderService implements UserDetailsService {

    private final UserRepo userRepo;

    public CustomUserBuilderService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        CustomUser byUsername = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with the username : " + username));

        return User.withUsername(byUsername.getUsername())
                .password(byUsername.getPassword())
                .roles(byUsername.getUserType())
                .build();
    }
}
