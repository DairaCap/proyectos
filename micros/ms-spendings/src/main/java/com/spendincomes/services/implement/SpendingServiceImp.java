package com.spendincomes.services.implement;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spendincomes.daos.interfaces.SpendingDao;
import com.spendincomes.models.Spending;
import com.spendincomes.services.interfaces.SpendingService;

@Service
public class SpendingServiceImp implements SpendingService {

    @Autowired
    private SpendingDao spendingDao;

    @Override
    public Spending saveSpending(Spending payment) {
        return spendingDao.saveSpending(payment);
    }

    @Override
    public List<Spending> getAllSpendings() {
        return spendingDao.findAllSpendings();
    }

    @Override
    public void deleteSpending(Long spendingID) {
        spendingDao.deleteSpending(spendingID);
    }

    @Override
    public Spending updateSpending(Long spendingID, Spending spending) {
        return spendingDao.updateSpending(spendingID, spending);
    }

    @Override
    public Spending findById(Long id) {
        return spendingDao.findById(id).orElse(null);
    }

    @Override
    public long totalSpendings(LocalDate date) {
        return spendingDao.totalSpendings(date);
    }

    @Override
    public long totalMissingSpendings(LocalDate date) {
        return spendingDao.totalMissingSpendings(date);
    }

    @Override
    public long totalSpendingsByDate(LocalDate date, boolean paid, String type) {
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
        return spendingDao.totalSpendingsByDate(firstDay, lastDay, paid);

    }

}
