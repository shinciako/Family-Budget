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


    ResponseEntity<Currency> addCurrency(Currency category){
        currencyRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    ResponseEntity<Currency> updateCurrency(Currency category, int id){
        Currency editCategory = currencyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with id "+id+" doesn't exist"));

        editCategory.setId(id);
        editCategory.setName(category.getName());
        currencyRepository.save(editCategory);
        return new ResponseEntity<>(editCategory, HttpStatus.OK);
    }

    ResponseEntity<Integer> deleteCurrency(int id){
        currencyRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.NO_CONTENT);
    }
}
