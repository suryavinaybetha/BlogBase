package com.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> {

                    // Allowing Swagger
                    authorize.requestMatchers(
                            "/v3/api-docs/**",
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/swagger-resources/**",
                            "/webjars/**"
                    ).permitAll();

                    // Allowing anyone to create a new user
                    authorize.requestMatchers("/api/user/createUser").permitAll();
                    authorize.requestMatchers("api/blog/getBlog/*/public").permitAll();
                    authorize.requestMatchers("api/blog/getAllBlogs/*/public").permitAll();


                    authorize.anyRequest().authenticated();
//                    authorize.requestMatchers("/api/blog/*").authenticated();
//                    authorize.requestMatchers("/api/user/*").authenticated();

                })
                .addFilterBefore(new BasicAuthenticationFilter(authenticationManager(httpSecurity)),
                        UsernamePasswordAuthenticationFilter.class)
                .build();


    }
}
