package com.example.budget;

import com.example.budget.user.JwtUser;
import com.example.budget.user.JwtUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin("http://localhost:3000")
public class AuthController {


    private final JwtUserService jwtUserService;

    public AuthController(JwtUserService jwtUserService) {
        this.jwtUserService = jwtUserService;
    }

    @GetMapping("/user")
    public String userEndpoint() {
        return ("User");
    }

    @PostMapping("/registration")
    public ResponseEntity<JwtUser> registerUser(@RequestBody JwtUser jwtUser){
        return jwtUserService.registerUser(jwtUser);
    }

    @GetMapping("/reflink")
    public Integer getReflinkId(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return jwtUserService.getCurrentId(authorizationHeader);
    }

}
