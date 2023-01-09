package com.example.budget;

import com.example.budget.user.JwtUser;
import com.example.budget.user.JwtUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ExampleController {


    private final JwtUserService jwtUserService;

    public ExampleController(JwtUserService jwtUserService) {
        this.jwtUserService = jwtUserService;
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
        jwtUserService.registerUser(jwtUser);
        return new ResponseEntity<>(jwtUser, HttpStatus.OK);
    }

}
