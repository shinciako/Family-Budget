package com.example.budget;

import com.example.budget.user.JwtUser;
import com.example.budget.user.JwtUserService;
import com.example.budget.user.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@Slf4j
@RestController
public class ExampleController {


    private final JwtUserService jwtUserService;
    private final PasswordEncoder passwordEncoder;

    public ExampleController(JwtUserService jwtUserService, PasswordEncoder passwordEncoder) {
        this.jwtUserService = jwtUserService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/user")
    public String userEndpoint() {
        return ("User");
    }

    @GetMapping("/admin")
    public String adminEndpoint() {
        return ("Admin");
    }

    @PostMapping("/registration")
    public ResponseEntity<JwtUser> registerUser(@RequestBody JwtUser jwtUser){
        if (jwtUserService.findJwtUserByEmail(jwtUser.getEmail()).isEmpty()) {
            jwtUserService.save(JwtUser.builder()
                    .username(jwtUser.getUsername())
                    .email(jwtUser.getEmail())
                    .password(passwordEncoder.encode(jwtUser.getPassword()))
                    .role(Set.of(Role.ROLE_USER))
                    .build());
        }
        return new ResponseEntity<>(jwtUser, HttpStatus.OK);
    }

}
