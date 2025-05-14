package com.blog.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "basicAuth", // name to reference later
        type = SecuritySchemeType.HTTP,
        scheme = "basic"
)
public class SwaggerSecurityConfig {
}
