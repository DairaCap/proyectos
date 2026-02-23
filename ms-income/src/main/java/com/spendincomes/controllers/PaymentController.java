package com.spendincomes.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.spendincomes.models.Payment;
import com.spendincomes.services.interfaces.PaymentService;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class PaymentController {

    @Autowired
    private PaymentService paymentService; 

    @GetMapping
    public List<Payment> listar() {
        return paymentService.getAllPayments();
    }

    @PostMapping
    public Payment guardar(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {

        paymentService.deletePayment(id);

        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}") 
    public ResponseEntity<Payment> actualizar(@PathVariable Long id, @RequestBody Payment payment) {
        Payment actualizado = paymentService.updatePayment(id, payment);
        
        if (actualizado == null) {
            return ResponseEntity.notFound().build(); 
        }
        return ResponseEntity.ok(actualizado);
    }
}
