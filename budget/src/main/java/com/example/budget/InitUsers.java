package com.example.budget;

import com.example.budget.user.JwtUser;
import com.example.budget.user.JwtUserService;
import com.example.budget.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class InitUsers implements CommandLineRunner {

    private final JwtUserService jwtUserService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (jwtUserService.findJwtUserByEmail("admin@test.com").isEmpty()) {
            jwtUserService.save(JwtUser.builder()
                    .username("Admin")
                    .email("admin@test.com")
                    .password(passwordEncoder.encode("test"))
                    .role(Set.of(Role.ROLE_ADMIN))
                    .build());
        }
        if (jwtUserService.findJwtUserByEmail("admin2@test.com").isEmpty()) {
            jwtUserService.save(JwtUser.builder()
                    .username("Admin2")
                    .email("admin2@test.com")
                    .password(passwordEncoder.encode("test"))
                    .role(Set.of(Role.ROLE_ADMIN))
                    .build());
        }
        if (jwtUserService.findJwtUserByEmail("user@test.com").isEmpty()) {
            jwtUserService.save(JwtUser.builder()
                    .username("User")
                    .email("user@test.com")
                    .password(passwordEncoder.encode("test"))
                    .role(Set.of(Role.ROLE_USER))
                    .build());
        }
    }

}