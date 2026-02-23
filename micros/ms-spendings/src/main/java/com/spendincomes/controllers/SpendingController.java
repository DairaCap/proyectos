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

import com.spendincomes.models.Spending;
import com.spendincomes.services.interfaces.SpendingService;

@RestController
@RequestMapping("/spendings")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class SpendingController {

    @Autowired
    private SpendingService spendingService;

    @GetMapping
    public ResponseEntity<List<Spending>> spendingList() {
        List<Spending> spendingList = spendingService.getAllSpendings();
        return ResponseEntity.ok(spendingList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Spending> getById(@PathVariable Long id) {
        Spending spending = spendingService.findById(id);
        return (spending != null) ? ResponseEntity.ok(spending) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Spending> createSpending(@RequestBody Spending spending) {
        Spending newSpending = spendingService.saveSpending(spending);
        return new ResponseEntity<>(newSpending, org.springframework.http.HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpending(@PathVariable Long id) {
        spendingService.deleteSpending(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Spending> updateSpending(@PathVariable Long id, @RequestBody Spending spending) {
        Spending updatedSpending = spendingService.updateSpending(id, spending);
        return ResponseEntity.ok(updatedSpending);
    }
    
    @GetMapping("/totalSpendings")
    public ResponseEntity<Long> totalSpendings(
        @RequestParam("date") 
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) 
        LocalDate date
    ) {
        long totalSpendings = spendingService.totalSpendings(date);
        return ResponseEntity.ok(totalSpendings);
    }

    @GetMapping("/totalMissingSpendings")
    public ResponseEntity<Long> totalMissingSpendings(
        @RequestParam("date")
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate date
    ) {
        long totalMissingSpendings = spendingService.totalMissingSpendings(date);
        return ResponseEntity.ok(totalMissingSpendings);
    }

    
    @GetMapping("/totalSpendingsByDate")
    public ResponseEntity<Long> totalSpendingsByDate(
        @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) 
        LocalDate date,
        @RequestParam("paid") boolean paid,
        @RequestParam("type") String type
        
    ){
        long totalSpendingsByDate = spendingService.totalSpendingsByDate(date, paid,type);
        return ResponseEntity.ok(totalSpendingsByDate);
    }

}
