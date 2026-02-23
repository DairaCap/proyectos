package com.spendincomes.services.implement;

import java.util.List;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spendincomes.daos.interfaces.IncomeDao;
import com.spendincomes.models.Income;
import com.spendincomes.services.interfaces.IncomeService;

@Service
public class IncomeServiceImp implements IncomeService {

    @Autowired
    private IncomeDao incomeDao;

    @Override
    public Income saveIncome(Income income) {
        return incomeDao.saveIncome(income);
    }

    @Override
    public List<Income> getAllIncomes() {
        return incomeDao.findAllIncomes();
    }
    @Override
    public void deleteIncome(Long incomeID) {
        incomeDao.deleteIncome(incomeID);
    }

    @Override
    public Income updateIncome(Long incomeID, Income income) {
        return incomeDao.updateIncome(incomeID, income);
    }
    @Override
    public Income findById(Long id) {
        return incomeDao.findById(id).orElse(null);
    }
    @Override
    public List<Income> monthIncomes() {
        return incomeDao.monthIncomes();
    }

    @Override
    public long totalIncomes(LocalDate date) {
        return incomeDao.totalIncomes(date);
    }
    @Override
    public long totalMissingIncomes(LocalDate date) {
        return incomeDao.totalMissingIncomes(date);
    }
    
    @Override
    public long totalIncomesByDate(LocalDate date, boolean paid, String type) {
        LocalDate firstDay;
        LocalDate lastDay;
        switch (type) {
            case "monthly" -> {
                firstDay = date.withDayOfMonth(1);
                lastDay = date.with(TemporalAdjusters.lastDayOfMonth());
            }
            case "yearly" -> {
                firstDay = date.withDayOfYear(1);
                lastDay = date.with(TemporalAdjusters.lastDayOfYear());
            }
            case "weekly" -> {
                firstDay = date.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
                lastDay = date.with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));
            }
            default -> {
                firstDay = date;
                lastDay = date;
            }            
        }
        return incomeDao.totalIncomesByDate(firstDay, lastDay, paid);

    }
    
}