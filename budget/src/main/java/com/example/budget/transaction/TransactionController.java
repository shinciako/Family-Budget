package com.example.budget.transaction;


import com.example.budget.category.Category;
import com.example.budget.category.CategoryRepository;
import com.example.budget.category.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequestMapping("/transactions")
@RestController
@CrossOrigin("http://localhost:3000")

public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @Autowired
    CategoryRepository repository;




    @GetMapping("/")
    public ResponseEntity<List<Transaction>> getAll(){
        return transactionService.getTransactions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getById(@PathVariable int id){
        return transactionService.getReferenceById(id);
    }

    @PostMapping("/")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction){
        return transactionService.addTransaction(transaction);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@RequestBody Transaction transaction, @PathVariable int id){
        return transactionService.updateTransaction(transaction, id);
    }

    @DeleteMapping("/bin/{id}")
    public ResponseEntity<Integer> deletePost(@PathVariable int id){
        return transactionService.deleteTransaction(id);
    }
}
