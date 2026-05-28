package com.blog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins:https://blog-base-git-grogufrontend-suryavinay-livecoms-projects.vercel.app,https://blog-base-neon.vercel.app,http://localhost:5173,https://localhost:5173,https://api.blogbase.com,http://api.blogbase.com}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // apply to all paths
                .allowedOrigins(allowedOrigins) // allow configurable origins
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

