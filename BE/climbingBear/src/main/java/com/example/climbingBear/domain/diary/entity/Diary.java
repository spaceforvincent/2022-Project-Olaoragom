package com.example.climbingBear.domain.diary.entity;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
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

    @Builder
    private Diary (User user, Mountain mntn, Integer year, Integer month, Integer day){
        this.user = user;
        this.mntn = mntn;
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public void update (Mountain mntn, Integer year, Integer month, Integer day) {
        this.mntn = mntn;
        this.year = year;
        this.month = month;
        this.day = day;
    }
}
