package com.example.budget.transaction;


import com.example.budget.user.JwtUser;
import com.example.budget.user.JwtUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/transactions")
@RestController
@CrossOrigin("http://localhost:3000")

public class TransactionController {

    private final TransactionService transactionService;
    private final JwtUserRepository jwtUserRepository;

    @Autowired
    public TransactionController(TransactionService transactionService, JwtUserRepository jwtUserRepository) {
        this.transactionService = transactionService;
        this.jwtUserRepository = jwtUserRepository;
    }



    @GetMapping("/")
    public ResponseEntity<List<Transaction>> getAll(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader){
        return transactionService.getTransactions(authorizationHeader);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getById(@PathVariable int id){
        return transactionService.getReferenceById(id);
    }

    @PostMapping("/new")
    public ResponseEntity<Transaction> addTransaction(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,@RequestBody Transaction transaction){
        return transactionService.addTransaction(transaction, authorizationHeader);
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
