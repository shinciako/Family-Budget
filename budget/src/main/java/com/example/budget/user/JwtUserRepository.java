package com.example.budget.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JwtUserRepository extends JpaRepository<JwtUser, Integer> {

    Optional<JwtUser> findJwtUserByUsername(String username);
    Optional<JwtUser> findJwtUserByEmail(String email);

    JwtUser findExistingJwtUserById(int id);

}