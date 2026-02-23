package com.spendincomes.models;
import lombok.Data;


@Data
public class Category {
    private Long id;
    private String name;
    private double target_amount;
    private double target_percentage;
    private boolean is_percentage;
    private Long parent_id;
    private String type;   
}
