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


    /**
     *
     * Endpoint to check if user is logged in.
     */
    @GetMapping("/user")
    public String userEndpoint() {
        return ("Logged");
    }

    /**
     * Endpoint to register user.
     */
    @PostMapping("/registration")
    public ResponseEntity<JwtUser> registerUser(@RequestBody JwtUser jwtUser){
        return jwtUserService.registerUser(jwtUser);
    }

    /**
     * Endpoint to generate reflink for user with user role.
     */
    @GetMapping("/reflink")
    public Integer getReflinkId(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return jwtUserService.getCurrentId(authorizationHeader);
    }

}
