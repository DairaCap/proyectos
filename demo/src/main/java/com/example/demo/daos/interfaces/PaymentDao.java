package com.example.demo.daos.interfaces;

import org.springframework.data.jpa.repository.JpaRepository; // ya tiene métodos como save(), findAll(), delete()
import org.springframework.stereotype.Repository;

import com.example.demo.models.Payment;


@Repository
public interface PaymentDao extends JpaRepository<Payment, Long> {
}