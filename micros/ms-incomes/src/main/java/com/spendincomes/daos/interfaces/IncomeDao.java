package com.spendincomes.daos.interfaces;
import java.util.List;
import java.util.Optional;

import java.time.LocalDate;
import org.springframework.stereotype.Repository;

import com.spendincomes.models.Income;

@Repository
public interface IncomeDao{
    public Income saveIncome(Income income);
    public List<Income> findAllIncomes();
    public void deleteIncome(Long incomeID);
    public Income updateIncome (Long incomeID, Income income); 
    public Optional<Income> findById(Long id);
    public List<Income> monthIncomes();
    public long totalIncomes(LocalDate date);
    public long totalMissingIncomes(LocalDate date);
    public long totalIncomesByDate(LocalDate date,LocalDate endDate, boolean paid);

}