package com.spendincomes.controllers;

import java.util.List;
import java.time.LocalDate;
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

import com.spendincomes.models.Income;
import com.spendincomes.services.interfaces.IncomeService;

@RestController
@RequestMapping("/incomes")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})

public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    @GetMapping
    public ResponseEntity<List<Income>> incomeList() {
        List<Income> incomeList = incomeService.getAllIncomes();
        return ResponseEntity.ok(incomeList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Income> getById(@PathVariable Long id) {
        Income income = incomeService.findById(id);
        return (income != null) ? ResponseEntity.ok(income) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Income> createSpending(@RequestBody Income income) {
        Income newSpending = incomeService.saveIncome(income);
        return new ResponseEntity<>(newSpending, org.springframework.http.HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpending(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Income> updateSpending(@PathVariable Long id, @RequestBody Income income) {
        Income updatedSpending = incomeService.updateIncome(id, income);
        return ResponseEntity.ok(updatedSpending);
    }

    @GetMapping("/monthIncomes")
    public ResponseEntity<List<Income>> monthIncomes() {
        List<Income> monthIncomes = incomeService.monthIncomes();
        return ResponseEntity.ok(monthIncomes);
    }

    @GetMapping("/totalIncomes")
    public ResponseEntity<Long> totalIncomes(
        @RequestParam("date") 
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) 
        LocalDate date
    ) {
        long totalIncomes = incomeService.totalIncomes(date);
        return ResponseEntity.ok(totalIncomes);
    }

    @GetMapping("/totalMissingIncomes")
    public ResponseEntity<Long> totalMissingIncomes(
        @RequestParam("date") 
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) 
        LocalDate date

    ) {
        long totalMissingIncomes = incomeService.totalMissingIncomes(date);
        return ResponseEntity.ok(totalMissingIncomes);
    }
    
    @GetMapping("/totalIncomesByDate")
    public ResponseEntity<Long> totalIncomesByDate(
        @RequestParam ("date")@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) 
        LocalDate date,
        @RequestParam("paid") boolean paid,
        @RequestParam ("type")
        String type
        
    ){
        long totalIncomesByDate = incomeService.totalIncomesByDate(date, paid,type);
        return ResponseEntity.ok(totalIncomesByDate);
    }

}
