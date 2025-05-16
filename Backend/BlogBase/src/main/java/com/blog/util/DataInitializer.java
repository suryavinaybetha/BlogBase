package com.blog.util;

import com.blog.entity.CustomUser;
import com.blog.repo.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepo userRepo;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public DataInitializer(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepo.count() == 0) {
            CustomUser customUser = new CustomUser();
            customUser.setUsername("admin");
            customUser.setPassword(encoder.encode("admin"));
            customUser.setFirstName("Surya Vinay");
            customUser.setEmail("surya@mail.com");
            customUser.setLastName("Betha");
            customUser.setUserType("ADMIN");
            userRepo.save(customUser);
            System.out.println("Admin user created");
        }
    }
}
