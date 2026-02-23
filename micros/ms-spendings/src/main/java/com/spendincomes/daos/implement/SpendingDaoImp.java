package com.spendincomes.daos.implement;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.spendincomes.daos.interfaces.SpendingDao;
import com.spendincomes.models.Spending;

@Repository
public class SpendingDaoImp implements SpendingDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Spending saveSpending(Spending spending) {
        String sql = "INSERT INTO spending (name, amount, description, limit_date, payment_date, paid, category_id,type) VALUES (?, ?, ?, ? ,? ,? ,?, ?) RETURNING id";

        Long newId = jdbcTemplate.queryForObject(
                sql,
                Long.class,
                spending.getName(),
                spending.getAmount(),
                spending.getDescription(),
                spending.getLimit_date(),
                spending.getPayment_date(),
                spending.isPaid(),
                spending.getCategory_id(),
                spending.getType()
        // spending.getUser_id()
        );
        spending.setId(newId);
        return spending;
    }

    @Override
    public List<Spending> findAllSpendings() {
        String sql = "SELECT * FROM spending";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Spending spending = new Spending();
            spending.setId(rs.getLong("id"));
            spending.setName(rs.getString("name"));
            spending.setAmount(rs.getDouble("amount"));
            spending.setDescription(rs.getString("description"));
            spending.setLimit_date(rs.getDate("limit_date"));
            spending.setPayment_date(rs.getDate("payment_date"));
            spending.setPaid(rs.getBoolean("paid"));
            spending.setCategory_id(rs.getLong("category_id"));
            spending.setType(rs.getString("type"));
            // spending.setUser_id(rs.getLong("user_id"));
            return spending;
        });

    }

    @Override
    public void deleteSpending(Long spendingID) {
        String sql = "DELETE FROM spending WHERE id = ?";
        jdbcTemplate.update(sql, spendingID);
    }

    @Override
    public Spending updateSpending(Long spendingID, Spending spending) {

        String sql = "UPDATE spending SET name = ?, amount = ?, description = ?, "
                + "limit_date = ?, payment_date = ?, paid = ?, "
                + "category_id = ?, type = ? "
                + "WHERE id = ? RETURNING *";

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            Spending s = new Spending();
            s.setId(rs.getLong("id"));
            s.setName(rs.getString("name"));
            s.setAmount(rs.getDouble("amount"));
            s.setDescription(rs.getString("description"));
            s.setLimit_date(rs.getDate("limit_date"));
            s.setPayment_date(rs.getDate("payment_date"));
            s.setPaid(rs.getBoolean("paid"));
            s.setCategory_id(rs.getLong("category_id"));
            s.setType(rs.getString("type"));
            // s.setUser_id(rs.getLong("user_id"));
            return s;
        },
                spending.getName(),
                spending.getAmount(),
                spending.getDescription(),
                spending.getLimit_date(),
                spending.getPayment_date(),
                spending.isPaid(),
                spending.getCategory_id(),
                spending.getType(),
                // spending.getUser_id(),
                spendingID);
    }

    @Override
    public Optional<Spending> findById(Long id) {
        String sql = "SELECT * FROM spending WHERE id = ?";

        try {
            Spending spending = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                Spending s = new Spending();
                s.setId(rs.getLong("id"));
                s.setName(rs.getString("name"));
                s.setAmount(rs.getDouble("amount"));
                s.setDescription(rs.getString("description"));
                s.setLimit_date(rs.getDate("limit_date"));
                s.setPayment_date(rs.getDate("payment_date"));
                s.setPaid(rs.getBoolean("paid"));
                s.setCategory_id(rs.getLong("category_id"));
                s.setType(rs.getString("type"));

                return s;
            }, id);

            return Optional.of(spending);

        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public long totalSpendings(LocalDate date) {
        String sql = "SELECT SUM(amount) FROM spending WHERE EXTRACT(MONTH FROM payment_date) = EXTRACT(MONTH FROM ?) AND EXTRACT(YEAR FROM payment_date) = EXTRACT(YEAR FROM ?) AND paid = TRUE";
        return jdbcTemplate.queryForObject(sql, Long.class, date, date);
    }

    @Override
    public long totalMissingSpendings(LocalDate date) {
        String sql = "SELECT SUM(amount) FROM spending WHERE EXTRACT(MONTH FROM limit_date) = EXTRACT(MONTH FROM ?) AND EXTRACT(YEAR FROM limit_date) = EXTRACT(YEAR FROM ?) AND paid = FALSE";
        return jdbcTemplate.queryForObject(sql, Long.class, date, date);
    }

    @Override
    public long totalSpendingsByDate(LocalDate date, LocalDate endDate, boolean paid) {
        String sql = "SELECT COALESCE(SUM(amount), 0) FROM spending WHERE payment_date BETWEEN ? AND ? AND paid = ?";
        return jdbcTemplate.queryForObject(sql, Long.class, date, endDate, paid);
    }

}
