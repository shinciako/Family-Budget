package com.example.budget.category;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<Category>> getAll(){
        return categoryService.getCategories();
    }

    @PostMapping("/")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category, @PathVariable int id){
        return categoryService.updateCategory(category,id);
    }

    @DeleteMapping("/bin/{id}")
    public ResponseEntity<Integer> deleteCategory(@PathVariable int id){
        return categoryService.deleteCategory(id);
    }
}
