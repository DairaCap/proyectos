package com.spendincomes.daos.interfaces;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import org.springframework.stereotype.Repository;

import com.spendincomes.models.Spending;

@Repository
public interface SpendingDao{
    public Spending saveSpending(Spending spending);
    public List<Spending> findAllSpendings();
    public void deleteSpending(Long spendingID);
    public Spending updateSpending (Long spendingID, Spending Spending); 
    public Optional<Spending> findById(Long id);
    public long totalSpendings (LocalDate date);
    public long totalMissingSpendings (LocalDate date);
    public long totalSpendingsByDate(LocalDate date,LocalDate endDate, boolean paid);

}