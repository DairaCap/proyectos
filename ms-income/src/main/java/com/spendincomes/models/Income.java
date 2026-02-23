package com.spendincomes.models;
import java.util.Date;

import lombok.Data;


@Data
public class Income {
    private long id;
    private String name;
    private double amount;
    private String description;
    private String type;
    private boolean global;
    private Date date;
    private int renovation;
}
