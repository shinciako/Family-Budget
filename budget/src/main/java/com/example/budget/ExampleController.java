package com.example.budget;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleController {

    @GetMapping("/user")
    public String userEndpoint() {
        return ("User");
    }

    @GetMapping("/admin")
    public String adminEndpoint() {
        return ("Admin");
    }

}
