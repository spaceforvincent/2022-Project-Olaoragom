package com.example.climbingBear.domain.diary.entity;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.user.entity.User;

import javax.persistence.*;

@Entity
public class Diary {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diary_seq")
    private Long diarySeq;

    @ManyToOne
    private User user;

    @ManyToOne
    private Mountain mntn;

    private Integer year;

    private Integer month;

    private Integer day;
}
