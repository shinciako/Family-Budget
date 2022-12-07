package com.example.budget.category;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Data
@Entity
@Table
public class Category {

    @Id
    @GeneratedValue
    private int id;
    @NonNull
    private String name;
}