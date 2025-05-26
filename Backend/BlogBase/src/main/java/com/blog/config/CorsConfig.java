package com.blog.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // apply to all paths
                .allowedOrigins("https://blog-base-git-grogufrontend-suryavinay-livecoms-projects.vercel.app",
                        "https://blog-base-neon.vercel.app",
                        "http://localhost:5173", "https://localhost:5173",
                        "https://api.blogbase.com", "http://api.blogbase.com") // allow all origins (use specific domains in production)
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

