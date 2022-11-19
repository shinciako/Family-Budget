package com.example.budget.transaction;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class TransactionConfig {

    @Bean
    CommandLineRunner commandLineRunner(TransactionRepository repository){
        return args -> {
            Transaction fajeczki = new Transaction(
                    "Fajeczki",
                    19f,
                    "Fun",
                    false
            );
            Transaction energetyk = new Transaction(
                    "Energetyk",
                    6.5f,
                    "Drink",
                    false
            );
            repository.saveAll(
                    List.of(fajeczki, energetyk)
            );
        };
    }
}
