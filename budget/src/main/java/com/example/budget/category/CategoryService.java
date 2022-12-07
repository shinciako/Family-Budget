package com.example.budget.category;


import com.example.budget.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;



    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    ResponseEntity<List<Category>> getCategories(){
        return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);
    }


    ResponseEntity<Category> addCategory(Category category){
        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    ResponseEntity<Category> updateCategory(Category category, int id){
        Category editCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with id "+id+" doesn't exist"));

        editCategory.setId(id);
        editCategory.setName(category.getName());
        categoryRepository.save(editCategory);
        return new ResponseEntity<>(editCategory, HttpStatus.OK);
    }

    ResponseEntity<Integer> deleteCategory(int id){
        categoryRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.NO_CONTENT);
    }
}
