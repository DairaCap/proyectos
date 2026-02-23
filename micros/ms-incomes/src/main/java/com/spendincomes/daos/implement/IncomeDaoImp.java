package com.spendincomes.daos.implement;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.spendincomes.daos.interfaces.IncomeDao;
import com.spendincomes.models.Income;

@Repository
public class IncomeDaoImp implements IncomeDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Income saveIncome(Income income) {
        String sql = "INSERT INTO income (name, amount, description, limit_date, payment_date, paid, category_id,type,global) VALUES (?, ?, ?, ? ,? ,? ,? ,?,? ) RETURNING id";

        Long newId = jdbcTemplate.queryForObject(
                sql,
                Long.class,
                income.getName(),
                income.getAmount(),
                income.getDescription(),
                income.getLimit_date(),
                income.getPayment_date(),
                income.isPaid(),
                income.getCategory_id(),
                // income.getUser_id(),
                income.getType(),
                income.isGlobal()
        );
        income.setId(newId);
        return income;
    }

    @Override
    public List<Income> findAllIncomes() {
        String sql = "SELECT * FROM income";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Income income = new Income();
            income.setId(rs.getLong("id"));
            income.setName(rs.getString("name"));
            income.setAmount(rs.getDouble("amount"));
            income.setDescription(rs.getString("description"));
            income.setLimit_date(rs.getDate("limit_date"));
            income.setPayment_date(rs.getDate("payment_date"));
            income.setPaid(rs.getBoolean("paid"));
            income.setCategory_id(rs.getLong("category_id"));
            // income.setUser_id(rs.getLong("user_id"));
            income.setType(rs.getString("type"));
            income.setGlobal(rs.getBoolean("global"));
            return income;
        });
    }

    @Override
    public void deleteIncome(Long incomeID) {
        String sql = "DELETE FROM income WHERE id = ?";
        jdbcTemplate.update(sql, incomeID);
    }

    @Override
    public Income updateIncome(Long incomeID, Income income) {

        String sql = "UPDATE income SET name = ?, amount = ?, description = ?, "
                + "limit_date = ?, payment_date = ?, paid = ?, "
                + "category_id = ?, type = ?, global = ?"
                + "WHERE id = ? RETURNING *";

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            Income i = new Income();
            i.setId(rs.getLong("id"));
            i.setName(rs.getString("name"));
            i.setAmount(rs.getDouble("amount"));
            i.setDescription(rs.getString("description"));
            i.setLimit_date(rs.getDate("limit_date"));
            i.setPayment_date(rs.getDate("payment_date"));
            i.setPaid(rs.getBoolean("paid"));
            i.setCategory_id(rs.getLong("category_id"));
            // i.setUser_id(rs.getLong("user_id"));
            i.setType(rs.getString("type"));
            i.setGlobal(rs.getBoolean("global"));
            return i;
        },
                income.getName(),
                income.getAmount(),
                income.getDescription(),
                income.getLimit_date(),
                income.getPayment_date(),
                income.isPaid(),
                income.getCategory_id(),
                // income.getUser_id(),
                income.getType(),
                income.isGlobal(),
                incomeID);
    }

    @Override
    public Optional<Income> findById(Long id) {
        String sql = "SELECT * FROM income WHERE id = ?";

        try {
            Income income = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                Income i = new Income();
                i.setId(rs.getLong("id"));
                i.setName(rs.getString("name"));
                i.setAmount(rs.getDouble("amount"));
                i.setDescription(rs.getString("description"));
                i.setLimit_date(rs.getDate("limit_date"));
                i.setPayment_date(rs.getDate("payment_date"));
                i.setPaid(rs.getBoolean("paid"));
                i.setCategory_id(rs.getLong("category_id"));
                i.setGlobal(rs.getBoolean("global"));
                i.setType(rs.getString("type"));
                return i;
            }, id);

            return Optional.of(income);

        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<Income> monthIncomes() {
        String sql = "SELECT * FROM income WHERE EXTRACT(MONTH FROM payment_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND paid = TRUE";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Income income = new Income();
            income.setId(rs.getLong("id"));
            income.setName(rs.getString("name"));
            income.setAmount(rs.getDouble("amount"));
            income.setDescription(rs.getString("description"));
            income.setLimit_date(rs.getDate("limit_date"));
            income.setPayment_date(rs.getDate("payment_date"));
            income.setPaid(rs.getBoolean("paid"));
            income.setCategory_id(rs.getLong("category_id"));
            // income.setUser_id(rs.getLong("user_id"));
            income.setType(rs.getString("type"));
            income.setGlobal(rs.getBoolean("global"));
            return income;
        });

    }
    @Override
    public long totalIncomes(LocalDate date) {
        String sql = "SELECT SUM(amount) FROM income WHERE EXTRACT(MONTH FROM payment_date) = EXTRACT(MONTH FROM ?) AND paid = TRUE AND EXTRACT(YEAR FROM payment_date) = EXTRACT(YEAR FROM ?)";
        return jdbcTemplate.queryForObject(sql, Long.class, date, date);
    }
    @Override
    public long totalMissingIncomes(LocalDate date) {
        String sql = "SELECT SUM(amount) FROM income WHERE EXTRACT(MONTH FROM limit_date) = EXTRACT(MONTH FROM ?) AND paid = FALSE AND EXTRACT(YEAR FROM limit_date) = EXTRACT(YEAR FROM ?)";
        return jdbcTemplate.queryForObject(sql, Long.class, date, date);
    }
    @Override
    public long totalIncomesByDate(LocalDate date, LocalDate endDate, boolean paid) {
        String sql = "SELECT COALESCE(SUM(amount), 0) FROM income WHERE payment_date BETWEEN ? AND ? AND paid = ?";
        return jdbcTemplate.queryForObject(sql, Long.class, date, endDate, paid);
    }




}
