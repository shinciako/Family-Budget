package com.example.budget.category;

import com.example.budget.user.JwtUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CategoryConfig {
    private final JwtUserRepository jwtUserRepository;

    public CategoryConfig(JwtUserRepository jwtUserRepository) {
        this.jwtUserRepository = jwtUserRepository;
    }

    @Bean
    CommandLineRunner commandLineRunner(CategoryRepository repository){

        return args -> {
            Category food = new Category("Food", jwtUserRepository.findExistingJwtUserById(1));
            Category drink = new Category("Drink", jwtUserRepository.findExistingJwtUserById(1));
            Category hardware = new Category("Hardware", jwtUserRepository.findExistingJwtUserById(1));
            Category dog = new Category("Dog", jwtUserRepository.findExistingJwtUserById(2));
            repository.saveAll(
                    List.of(food, drink, hardware, dog)
            );
        };
    }
}
