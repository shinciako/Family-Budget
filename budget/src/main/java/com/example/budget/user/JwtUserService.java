package com.example.budget.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class JwtUserService {

    private final JwtUserRepository jwtUserRepository;
    private final PasswordEncoder passwordEncoder;

    public JwtUser save(JwtUser user) {
        return jwtUserRepository.save(user);
    }

    public Optional<JwtUser> findJwtUserByEmail(String email) {
        return jwtUserRepository.findJwtUserByEmail(email);
    }

    public JwtUser getJwtUserByEmail(String email) {
        return jwtUserRepository.findJwtUserByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found by email!"));
    }

    public JwtUser getJwtUserByUsername(String username) {
        return jwtUserRepository.findJwtUserByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found by username!"));
    }

    public JwtUser registerUser(JwtUser jwtUser){
        if (findJwtUserByEmail(jwtUser.getEmail()).isEmpty()) {
            save(JwtUser.builder()
                    .username(jwtUser.getUsername())
                    .email(jwtUser.getEmail())
                    .password(passwordEncoder.encode(jwtUser.getPassword()))
                    .role(Set.of(Role.ROLE_USER))
                    .build());
        }
        return jwtUser;
    }

}