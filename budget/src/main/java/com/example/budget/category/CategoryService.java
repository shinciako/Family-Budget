package com.example.budget.category;


import com.example.budget.exception.ResourceNotFoundException;
import com.example.budget.transaction.Transaction;
import com.example.budget.transaction.TransactionRepository;
import com.example.budget.user.JwtUserRepository;
import com.example.budget.user.JwtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;
    private final JwtUserService jwtUserService;
    private final JwtUserRepository jwtUserRepository;


    @Autowired
    public CategoryService(CategoryRepository categoryRepository, TransactionRepository transactionRepository, JwtUserService jwtUserService, JwtUserRepository jwtUserRepository) {
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
        this.jwtUserService = jwtUserService;
        this.jwtUserRepository = jwtUserRepository;
    }

    ResponseEntity<List<Category>> getCategories(String authorizationHeader) {
//        int id = jwtUserService.getIdFromJwt(authorizationHeader);
        int id = jwtUserService.getCurrentId(authorizationHeader);
        return new ResponseEntity<>(categoryRepository.findByUserId(id), HttpStatus.OK);
    }


    ResponseEntity<Category> addCategory(String authorizationHeader, Category category) {
        int id = jwtUserService.getIdFromJwt(authorizationHeader);
        category.setUser(jwtUserRepository.findExistingJwtUserById(id));
        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    ResponseEntity<Category> updateCategory(String authorizationHeader,Category category, int id) {
        Category editCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with id " + id + " doesn't exist"));
        if (editCategory.getUser().getId() == jwtUserService.getIdFromJwt(authorizationHeader)) {
            editCategory.setId(id);
            editCategory.setName(category.getName());
            categoryRepository.save(editCategory);
            return new ResponseEntity<>(editCategory, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    ResponseEntity deleteCategory(String authorizationHeader, int id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with id " + id + " doesn't exist"));

        if(category.getUser().getId() == jwtUserService.getIdFromJwt(authorizationHeader)) {
            try {
                categoryRepository.deleteById(id);
            } catch (Exception e) {
                List<Transaction> desiredList = transactionRepository.findByCategoryId(id);
                for (Transaction transaction : desiredList) {
                    transactionRepository.deleteById(transaction.getId());
                }
                categoryRepository.deleteById(id);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
