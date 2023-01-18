package com.example.budget.category;

import com.example.budget.user.JwtUser;
import lombok.*;

import javax.persistence.*;

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

    @NonNull
    @ManyToOne(fetch = FetchType.EAGER)
    @PrimaryKeyJoinColumn(name = "user_id")
    private JwtUser user;
}