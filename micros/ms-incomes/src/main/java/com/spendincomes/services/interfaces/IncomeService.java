package com.spendincomes.services.interfaces;
import java.util.List;
import java.time.LocalDate;
import com.spendincomes.models.Income;

public interface IncomeService {
    Income saveIncome(Income income);
    List<Income> getAllIncomes();
    void deleteIncome(Long incomeID);
    Income updateIncome (Long id, Income incomeDetails); 
    Income findById(Long id);
    List<Income> monthIncomes();
    long totalIncomes(LocalDate date);
    long totalMissingIncomes(LocalDate date);
    long totalIncomesByDate(LocalDate date, boolean paid, String type);
}
