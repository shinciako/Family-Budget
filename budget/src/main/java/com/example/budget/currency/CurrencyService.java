package com.example.budget.currency;


import com.example.budget.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrencyService {
    private final CurrencyRepository currencyRepository;



    @Autowired
    public CurrencyService(CurrencyRepository currencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    ResponseEntity<List<Currency>> getCurrencies(){
        return new ResponseEntity<>(currencyRepository.findAll(), HttpStatus.OK);
    }
}
