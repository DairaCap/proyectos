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

// ... (imports anteriores)

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // ... (getAll y getByType están bien)

    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable("id") Long id) { // <-- CAMBIO: Se agregó ("id")
        Category category = categoryService.findById(id);
        return (category != null) ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpending(@PathVariable("id") Long id) { // <-- CAMBIO: Se agregó ("id")
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/total")
    public ResponseEntity<Double> totalPerCategory(
            @RequestParam("categoryID") Long categoryID,
            @RequestParam("date") // <-- CAMBIO: Se agregó ("date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam("paid") Boolean paid,
            @RequestParam("type") String type  
        ){
        double total = categoryService.totalPerCategory(categoryID, date, paid, type);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/amountPerCategory")
    public ResponseEntity<List<AmountPerCategory>> amountPerCategory(
        @RequestParam("date") // <-- CAMBIO: Se agregó ("date")
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) 
        LocalDate date,
        @RequestParam("type") String type, //semanal.mensual,anual
        
        @RequestParam("categoryType") String categoryType //spending, income
    ){
        List<AmountPerCategory> amountPerCategory = categoryService.amountPerCategory(date, type, categoryType);
        return ResponseEntity.ok(amountPerCategory);
    }
}