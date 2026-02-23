package com.spendincomes.daos.interfaces;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.spendincomes.models.Income;


@Repository
public interface IncomeDao{
    public Income save(Income Income);
    public List<Income> findAll();
    public void delete(Income Income);
    public Income update(Income Income);
    public void deleteById(Long id);
    public Optional<Income> findById(Long id);
}