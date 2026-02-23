package com.spendincomes.services.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spendincomes.daos.interfaces.PaymentDao;
import com.spendincomes.models.Payment;
import com.spendincomes.services.interfaces.PaymentService;

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
    public Payment updatePayment(Long id, Payment paymentDetails){
        // 1. Buscamos si existe
        Payment payment = paymentDao.findById(id).orElse(null);

        if (payment != null) {
            // 2. Actualizamos los campos
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
