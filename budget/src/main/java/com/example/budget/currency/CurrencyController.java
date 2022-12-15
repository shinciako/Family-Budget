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


    @GetMapping("/")
    public ResponseEntity<List<Currency>> getAll(){
        return currencyService.getCurrencies();
    }

    @PostMapping("/")
    public ResponseEntity<Currency> addCurrency(@RequestBody Currency currency){
        return currencyService.addCurrency(currency);
    }

    @PutMapping("/")
    public ResponseEntity<Currency> updateCurrency(@RequestBody Currency currency, @PathVariable int id){
        return currencyService.updateCurrency(currency, id);
    }

    @DeleteMapping("/bin/{id}")
    public ResponseEntity<Integer> deleteCurrency(@PathVariable int id){
        return currencyService.deleteCurrency(id);
    }
}
