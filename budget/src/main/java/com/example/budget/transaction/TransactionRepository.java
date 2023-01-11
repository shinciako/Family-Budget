package com.example.budget.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    Optional<Transaction> findById(int id);
    List<Transaction> findByUserId(int id);

    List<Transaction> findByCategoryId(int id);
}
