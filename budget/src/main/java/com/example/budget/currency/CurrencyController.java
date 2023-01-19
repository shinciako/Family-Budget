package com.example.budget.currency;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/currencies")
@RestController
@CrossOrigin("http://localhost:3000")
public class CurrencyController {

    private final CurrencyService currencyService;

    @Autowired
    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }


    /**
     * Get all the currencies
     */
    @GetMapping("/")
    public ResponseEntity<List<Currency>> getAll(){
        return currencyService.getCurrencies();
    }

}
