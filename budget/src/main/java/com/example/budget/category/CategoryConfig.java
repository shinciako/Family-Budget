package com.example.budget.category;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CategoryConfig {
    @Bean
    CommandLineRunner commandLineRunner(CategoryRepository repository){
        return args -> {
            Category food = new Category("Food");
            Category drink = new Category("Drink");
            Category hardware = new Category("Hardware");
            Category dog = new Category("Dog");
            repository.saveAll(
                    List.of(food, drink, hardware, dog)
            );
        };
    }
}
