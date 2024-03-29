package com.example.budget.transaction;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    /**
     * Get all of the user's transactions.
     */
    @GetMapping("/")
    public ResponseEntity<List<Transaction>> getAll(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return transactionService.getTransactions(authorizationHeader);
    }

    /**
     * Post new transaction.
     */
    @PostMapping("/new")
    public ResponseEntity<Transaction> addTransaction(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction, authorizationHeader);
    }

    /**
     * Update specific user's transaction by id.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody Transaction transaction,
            @PathVariable int id) {
        return transactionService.updateTransaction(transaction, id, authorizationHeader);
    }

    /**
     * Delete specific user's transaction by id.
     */
    @DeleteMapping("/bin/{id}")
    public ResponseEntity deletePost(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @PathVariable int id) {
        return transactionService.deleteTransaction(id,authorizationHeader);
    }
}
