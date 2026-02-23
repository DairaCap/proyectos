package com.spendincomes.services.implement;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spendincomes.daos.interfaces.CategoryDao;
import com.spendincomes.models.Category;
import com.spendincomes.services.interfaces.CategoryService;
import com.spendincomes.models.AmountPerCategory;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    private CategoryDao categoryDao;

    @Override
    public Category saveCategory(Category category) {
        return categoryDao.saveCategory(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryDao.findAllCategories();
    }

    @Override
    public void deleteCategory(Long categoryID) {
        categoryDao.deleteCategory(categoryID);
    }

    // @Override
    // public Category updateCategory(Long categoryID, Category category) {
    //     return categoryDao.updateCategory(categoryID, category);
    // }

    @Override
    public Category findById(Long id) {
        return categoryDao.findById(id).orElse(null);
    }

    @Override
    public double totalPerCategory(Long categoryID, LocalDate date, Boolean paid, String type) {
        return categoryDao.totalPerCategory(categoryID, date, paid, type);
    }

    @Override
    public List<AmountPerCategory> amountPerCategory(LocalDate date, String type, String categoryType) {
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
        return categoryDao.amountPerCategory(firstDay, lastDay, categoryType);

    }
    @Override
    public List<Category> getAllCategoriesByType(String type) {
        if (type == null || type.isEmpty()) {
            return categoryDao.findAllCategories();
        }
        return categoryDao.findAllCategoriesByType(type);
    }
}    

