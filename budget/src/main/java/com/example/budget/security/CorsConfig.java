package com.example.budget.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/login")
                .allowedMethods("*");
        registry.addMapping("/registration")
                .allowedMethods("*");
        registry.addMapping("/user")
                .allowedMethods("*");
    }

}