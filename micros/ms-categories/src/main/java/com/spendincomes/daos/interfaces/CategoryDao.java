package com.spendincomes.daos.interfaces;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.spendincomes.models.AmountPerCategory;
import com.spendincomes.models.Category;

@Repository
public interface CategoryDao{
    public Category saveCategory(Category category);

    public List<Category> findAllCategories();
    public List<Category> findAllCategoriesByType(String type);
    public void deleteCategory(Long categoryID);
    // public Category updateCategory (Long categoryID, Category category) ; 
    public Optional<Category> findById(Long id);
    public double totalPerCategory(Long categoryID, LocalDate date, Boolean paid,String type);
    public List<AmountPerCategory> amountPerCategory(LocalDate date, LocalDate endDate, String type);
    // public List<Category> monthCategories();
    // public long totalCategories(LocalDate date);
    // public long totalMissingCategories(LocalDate date);

}
