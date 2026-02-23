package com.spendincomes.services.interfaces;
import java.util.List;
import java.time.LocalDate;

import com.spendincomes.models.Spending;

public interface SpendingService {
    Spending saveSpending(Spending Spending);
    List<Spending> getAllSpendings();
    void deleteSpending(Long spendingID);
    Spending updateSpending (Long id, Spending SpendingDetails); 
    Spending findById(Long id);
    long totalSpendings(LocalDate date);
    long totalMissingSpendings(LocalDate date);
    long totalSpendingsByDate(LocalDate date, boolean paid, String type);

}

