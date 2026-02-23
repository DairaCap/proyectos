package com.spendincomes.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spendincomes.models.AmountPerCategory;
import com.spendincomes.models.Category;
import com.spendincomes.services.interfaces.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})

public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> categoryList() {
        List<Category> categoryList = categoryService.getAllCategories();
        return ResponseEntity.ok(categoryList);
    }

    @GetMapping("/type")
    public ResponseEntity<List<Category>> categoryListByType(
        @RequestParam ("type")
        String type
    ) {
        List<Category> categoryList = categoryService.getAllCategoriesByType(type);
        return ResponseEntity.ok(categoryList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable Long id) {
        Category category = categoryService.findById(id);
        return (category != null) ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Category> createSpending(@RequestBody Category category) {
        Category newSpending = categoryService.saveCategory(category);
        return new ResponseEntity<>(newSpending, org.springframework.http.HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpending(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<Category> updateSpending(@PathVariable Long id, @RequestBody Category category) {
    //     Category updatedSpending = categoryService.updateCategory(id, category);
    //     return ResponseEntity.ok(updatedSpending);
    // }
    @GetMapping("/total")
    public ResponseEntity<Double> totalPerCategory(
            @RequestParam 
            Long categoryID,
            @RequestParam 
            @DateTimeFormat (iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam (value = "paid", required = false)
            Boolean paid,
            @RequestParam (value = "type", required = false)
            String type  
        ){
        double total = categoryService.totalPerCategory(categoryID, date, paid,type);
        return ResponseEntity.ok(total);
    }
    @GetMapping("/amountPerCategory")
    public ResponseEntity<List<AmountPerCategory>> amountPerCategory(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) 
        LocalDate date,
        @RequestParam ("type")
        String type,
        @RequestParam ("categoryType")
        String categoryType
    ){
        List<AmountPerCategory> amountPerCategory = categoryService.amountPerCategory(date, type, categoryType);
        return ResponseEntity.ok(amountPerCategory);
    }

}
