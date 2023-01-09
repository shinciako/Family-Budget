package com.example.budget.transaction;

import com.example.budget.exception.ResourceNotFoundException;
import com.example.budget.user.JwtUserRepository;
import com.example.budget.user.JwtUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Slf4j
@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    private final JwtUserService jwtUserService;
    private final JwtUserRepository jwtUserRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, JwtUserService jwtUserService, JwtUserRepository jwtUserRepository) {
        this.transactionRepository = transactionRepository;
        this.jwtUserService = jwtUserService;
        this.jwtUserRepository = jwtUserRepository;
    }

    private String getEmailFromJwt(String authorizationHeader){
        String[] chunks = authorizationHeader.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        chunks[0] = chunks[0].replace("Bearer ", "");
        String payload = new String(decoder.decode(chunks[1]));
        String email = payload.substring(8).split("\"")[0];
        return email;
    }

    ResponseEntity<List<Transaction>> getTransactions(String authorizationHeader){
        int id = jwtUserService.getJwtUserByEmail(getEmailFromJwt(authorizationHeader)).getId();
        return new ResponseEntity<>(transactionRepository.findByUserId(id), HttpStatus.OK);
    }

    ResponseEntity<Transaction> getReferenceById(int id){
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction with id "+id+" doesn't exist"));
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    ResponseEntity<Transaction> addTransaction(Transaction transaction, String authorizationHeader){
        int id = jwtUserService.getJwtUserByEmail(getEmailFromJwt(authorizationHeader)).getId();
        transaction.setUser(jwtUserRepository.findExistingJwtUserById(id));
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
        editTransaction.setDate(transaction.getDate());
        editTransaction.setCurrency(transaction.getCurrency());
        editTransaction.setFixed(transaction.isFixed());
        transactionRepository.save(editTransaction);
        return new ResponseEntity<>(editTransaction, HttpStatus.OK);
    }

    ResponseEntity<Integer> deleteTransaction(int id){
        transactionRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.NO_CONTENT);
    }
}
