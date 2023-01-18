package com.example.budget.category;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/categories")
@RestController
@CrossOrigin("http://localhost:3000")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping("/")
    public ResponseEntity<List<Category>> getAll(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader){
        return categoryService.getCategories(authorizationHeader);
    }

    @PostMapping("/new")
    public ResponseEntity<Category> addCategory(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody Category category){
        return categoryService.addCategory(authorizationHeader, category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody Category category,
            @PathVariable int id){
        return categoryService.updateCategory(authorizationHeader, category,id);
    }

    @DeleteMapping("/bin/{id}")
    public ResponseEntity deleteCategory(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @PathVariable int id){
        return categoryService.deleteCategory(authorizationHeader, id);
    }
}
