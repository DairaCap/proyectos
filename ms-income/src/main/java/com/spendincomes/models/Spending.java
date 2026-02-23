package com.spendincomes.models;
import lombok.Data;

@Data
public class Spending {
    private long id;
    private String name;
    private double amount_goal;
    private double percentage_goal;
    private boolean is_percentage;
    private long father;
}