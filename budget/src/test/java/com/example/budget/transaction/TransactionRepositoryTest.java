package com.example.budget.transaction;

import com.example.budget.category.Category;
import com.example.budget.category.CategoryRepository;
import com.example.budget.user.JwtUser;
import com.example.budget.user.JwtUserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class TransactionRepositoryTest {


    @Autowired
    TransactionRepository repository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    JwtUserRepository jwtUserRepository;

    JwtUser jwtUser = JwtUser.builder()
            .id(1)
            .username("A1")
            .email("a1@test.com")
            .build();
    JwtUser jwtUser2 = JwtUser.builder()
            .id(2)
            .username("A2")
            .email("a2@test.com")
            .build();

    Category category1 = new Category("Test1", jwtUser);
    Category category2 = new Category("Test2", jwtUser);

    @BeforeEach
    void setUp() {
        category1.setId(1);
        category1.setId(2);
        jwtUserRepository.saveAllAndFlush(List.of(jwtUser, jwtUser2));

        categoryRepository.saveAllAndFlush(List.of(category1, category2));

        repository.saveAllAndFlush(List.of(
                new Transaction("Test1", 666, category1, jwtUser),
                new Transaction("Test2", 667, category1, jwtUser),
                new Transaction("Test3", 668, category2, jwtUser2)));
    }

    @AfterEach
    void finish(){
        repository.deleteAll();
    }

    @Test
    public void checkIfRepExists() {
        assertThat(repository).isNotNull();
        assertThat(categoryRepository).isNotNull();
        assertThat(jwtUserRepository).isNotNull();
    }


    @Test
    void findAllShouldProduceAllTransactions() {
        List<Transaction> transactions = repository.findAll();
        assertThat(transactions).hasSize(3);
    }

    @Test
    void findTransactionsByUserIdShouldRetrieveOneEntry() {
        List<Transaction> transactions = repository.findByUserId(2);
        assertThat(transactions).hasSize(1);
    }

    @Test
    void findTransactionsByCategoryIdShouldRetrieveTwoEntry() {
        List<Transaction> transactions = repository.findByCategoryId(2);
        assertThat(transactions).hasSize(2);
    }

}