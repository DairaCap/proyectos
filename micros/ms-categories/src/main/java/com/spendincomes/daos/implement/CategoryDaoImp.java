package com.spendincomes.daos.implement;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.spendincomes.daos.interfaces.CategoryDao;
import com.spendincomes.models.AmountPerCategory;
import com.spendincomes.models.Category;

@Repository
public class CategoryDaoImp implements CategoryDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Category saveCategory(Category category) {
        String sql = "INSERT INTO category (name, target_amount, target_percentage, is_percentage, parent_id, type) VALUES (?, ?, ?, ? ,? ,? ) RETURNING id";

        Long newId = jdbcTemplate.queryForObject(
                sql,
                Long.class,
                category.getName(),
                category.getTarget_amount(),
                category.getTarget_percentage(),
                category.is_percentage(),
                category.getParent_id(),
                category.getType()
        );
        category.setId(newId);
        return category;
    }

    @Override
    public List<Category> findAllCategories() {
        String sql = "SELECT * FROM category";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Category category = new Category();
            category.setId(rs.getLong("id"));
            category.setName(rs.getString("name"));
            category.setTarget_amount(rs.getDouble("target_amount"));
            category.setTarget_percentage(rs.getDouble("target_percentage"));
            category.set_percentage(rs.getBoolean("is_percentage"));
            category.setParent_id(rs.getLong("parent_id"));
            category.setType(rs.getString("type"));
            return category;
        });
    }
    @Override
    public List<Category> findAllCategoriesByType(String type) {
        String sql = "SELECT * FROM category WHERE type = ? ";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Category category = new Category();
            category.setId(rs.getLong("id"));
            category.setName(rs.getString("name"));
            category.setTarget_amount(rs.getDouble("target_amount"));
            category.setTarget_percentage(rs.getDouble("target_percentage"));
            category.set_percentage(rs.getBoolean("is_percentage"));
            category.setParent_id(rs.getLong("parent_id"));
            category.setType(rs.getString("type"));
            return category;
        }, type);
    }

    @Override
    public void deleteCategory(Long categoryID) {
        String sql = "DELETE FROM category WHERE id = ?";
        jdbcTemplate.update(sql, categoryID);
    }

    // @Override
    // public Category updateCategory(Long categoryID, Category category) {

    //     String sql = "UPDATE category SET name = ?, target_amount = ?, target_percentage = ?, is_percentage = ?, parent_id = ?, type = ? WHERE id = ? RETURNING *";

    //     return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
    //         Category c = new Category();
    //         c.setId(rs.getLong("id"));
    //         c.setName(rs.getString("name"));
    //         c.setTarget_amount(rs.getDouble("target_amount"));
    //         c.setTarget_percentage(rs.getDouble("target_percentage"));
    //         c.set_percentage(rs.getBoolean("is_percentage"));
    //         c.setParent_id(rs.getLong("parent_id"));
    //         c.setType(rs.getString("type"));
    //         return c;
    //     },
    //             category.getName(),
    //             category.getTarget_amount(),
    //             category.getTarget_percentage(),
    //             category.is_percentage(),
    //             category.getParent_id(),
    //             category.getType(),
    //             categoryID);
    // }

    @Override
    public Optional<Category> findById(Long id) {
        String sql = "SELECT * FROM category WHERE id = ?";

        try {
            Category category = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                Category c = new Category();
                c.setId(rs.getLong("id"));
                c.setName(rs.getString("name"));
                c.setTarget_amount(rs.getDouble("target_amount"));
                c.setTarget_percentage(rs.getDouble("target_percentage"));
                c.set_percentage(rs.getBoolean("is_percentage"));
                c.setParent_id(rs.getLong("parent_id"));
                c.setType(rs.getString("type"));
                return c;
            }, id);

            return Optional.of(category);

        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public double totalPerCategory(Long categoryID, LocalDate date, Boolean paid,String type) {
        LocalDate firstDay = date.withDayOfMonth(1);
        LocalDate lastDay = date.with(TemporalAdjusters.lastDayOfMonth());

        String sql = "SELECT SUM(amount) FROM transaction WHERE category_id = ? AND date BETWEEN ? AND ? AND (? IS NULL OR paid = ?) AND type = ?";
        return jdbcTemplate.queryForObject(sql, Double.class, categoryID, firstDay, lastDay, paid, paid,type);
    }
    @Override
    public List<AmountPerCategory> amountPerCategory(LocalDate date, LocalDate endDate, String type) {
        String sql = "SELECT c.name AS categoryName, COALESCE(SUM(s.amount), 0) AS amount " +
                    "FROM category c LEFT JOIN spending s ON c.id = s.category_id WHERE s.paid = true AND s.payment_date BETWEEN ? AND ? AND c.type = ? " +
                    "GROUP BY c.name";
    

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            AmountPerCategory apc = new AmountPerCategory();
            apc.setCategoryName(rs.getString("categoryName"));
            apc.setAmount(rs.getDouble("amount"));
            return apc;
        }, date, endDate, type);
    }   

}
