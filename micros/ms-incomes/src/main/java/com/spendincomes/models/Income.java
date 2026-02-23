package com.spendincomes.models;
import java.util.Date;

import lombok.Data;


@Data
public class Income {
    private long id;
    private String name;
    private double amount;
    private String description;
    private Date limit_date;
    private Date payment_date;
    private boolean paid;
    private long category_id;
    // private long user_id;
    private String type;
    private boolean global;
}
