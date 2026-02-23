package com.example.demo.services.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.daos.interfaces.PaymentDao;
import com.example.demo.models.Payment;
import com.example.demo.services.interfaces.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentDao paymentDao;

    @Override
    public Payment savePayment(Payment payment) {
        return paymentDao.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentDao.findAll();
    }

    @Override
    public void deletePayment(Long id) {
        paymentDao.deleteById(id);
    }

    @Override
    public Payment updatePayment(Long id, Payment paymentDetails) {

        Payment payment = paymentDao.findById(id).orElse(null);

        if (payment != null) {

            payment.setName(paymentDetails.getName());
            payment.setAmount(paymentDetails.getAmount());
            payment.setCategory(paymentDetails.getCategory());
            payment.setDescription(paymentDetails.getDescription());
            payment.setPaymentDate(paymentDetails.getPaymentDate());

            return paymentDao.save(payment);
        }
        return null;
    }
}
