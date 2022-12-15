package com.example.budget.currency;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CurrencyConfig {
    @Bean
    CommandLineRunner commandLineRunnerCurrency(CurrencyRepository repository){
        return args -> {
            Currency pln = new Currency("Zloty", "PLN");
            Currency eur = new Currency("Euro", "EUR");
            Currency usd = new Currency("American Dollar", "USD");
            repository.saveAll(
                    List.of(pln, eur, usd)
            );
        };
    }
}
