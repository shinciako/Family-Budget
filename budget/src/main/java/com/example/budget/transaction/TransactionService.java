package com.example.budget.transaction;

import com.example.budget.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;



    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    ResponseEntity<List<Transaction>> getTransactions(){
        return new ResponseEntity<>(transactionRepository.findAll(), HttpStatus.OK);
    }

    ResponseEntity<Transaction> getReferenceById(int id){
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction with id "+id+" doesn't exist"));
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    ResponseEntity<Transaction> addTransaction(Transaction transaction){
        transactionRepository.save(transaction);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }


    ResponseEntity<Transaction> updateTransaction(Transaction transaction, int id){
        Transaction editTransaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction with id "+id+" doesn't exist"));

        editTransaction.setId(id);
        editTransaction.setName(transaction.getName());
        editTransaction.setPrice(transaction.getPrice());
        editTransaction.setCategory(transaction.getCategory());
        editTransaction.setFixed(transaction.isFixed());
        transactionRepository.save(editTransaction);
        return new ResponseEntity<>(editTransaction, HttpStatus.OK);
    }

    ResponseEntity<Integer> deleteTransaction(int id){
        transactionRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.NO_CONTENT);
    }
}
