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

    ResponseEntity<Optional<Transaction>> getReferenceById(int id){
        return new ResponseEntity<>(transactionRepository.findById(id), HttpStatus.OK);
    }

    ResponseEntity<Transaction> addTransaction(Transaction transaction){
        transactionRepository.save(transaction);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }


    ResponseEntity<Transaction> editTransaction(Transaction transaction, int id){
        Transaction updateTransaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction with id "+id+" doesn't exist"));

        updateTransaction.setId(id);
        updateTransaction.setName(transaction.getName());
        updateTransaction.setPrice(transaction.getPrice());
        updateTransaction.setCategory(transaction.getCategory());
        updateTransaction.setFixed(transaction.isFixed());
        transactionRepository.save(updateTransaction);
        return new ResponseEntity<>(updateTransaction, HttpStatus.CREATED);
    }

    ResponseEntity<Integer> deleteTransaction(int id){
        transactionRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.NO_CONTENT);
    }
}
