package com.example.budget.transaction;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequestMapping("/transactions")
@RestController
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }




    @GetMapping("/")
    public ResponseEntity<List<Transaction>> getAll(){
        return transactionService.getTransactions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Transaction>> getById(@PathVariable int id){
        return transactionService.getReferenceById(id);
    }

    @PostMapping("/")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction){
        return transactionService.addTransaction(transaction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> editTransaction(@RequestBody Transaction transaction, @PathVariable int id){
        return transactionService.editTransaction(transaction, id);
    }

    @DeleteMapping("/bin/{id}")
    public ResponseEntity<Integer> deletePost(@PathVariable int id){
        return transactionService.deleteTransaction(id);
    }
}
