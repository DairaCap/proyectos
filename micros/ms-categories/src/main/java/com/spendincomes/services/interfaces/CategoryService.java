package com.spendincomes.services.interfaces;
import java.util.List;
import java.time.LocalDate;
import com.spendincomes.models.Category;
import com.spendincomes.models.AmountPerCategory;

public interface CategoryService {
    Category saveCategory(Category category);
    List<Category> getAllCategories();
    List<Category> getAllCategoriesByType(String type);
    void deleteCategory(Long categoryID);
    // Category updateCategory (Long id, Category categoryDetails); 
    Category findById(Long id);
    double totalPerCategory(Long categoryID, LocalDate date, Boolean paid,String type);
    List<AmountPerCategory> amountPerCategory(LocalDate date, String type, String categoryType);
    // List<Category> monthCategories();
    // long totalCategories(LocalDate date);
    // long totalMissingCategories(LocalDate date);

}

