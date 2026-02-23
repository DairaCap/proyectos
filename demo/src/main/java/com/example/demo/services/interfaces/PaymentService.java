package com.example.demo.services.interfaces;
import java.util.List;

import com.example.demo.models.Payment;

public interface PaymentService {
    Payment savePayment(Payment payment);
    List<Payment> getAllPayments();
    void deletePayment(Long id);
    Payment updatePayment (Long id, Payment paymentDetails); 
}
