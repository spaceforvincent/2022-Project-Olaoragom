package com.example.climbingBear.domain.record.entity;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Record {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_seq")
    private Long recordSeq;
    @ManyToOne
    private Mountain mntn;
    @ManyToOne
    private User user;
    private Integer year;
    private Integer month;
    private Integer day;
    private Float distance;
    private String time;

    private boolean isComplete;

    @Builder
    private Record (User user, Mountain mntn, Integer year, Integer month, Integer day, Float distance, String time, boolean isComplete){
        this.user = user;
        this.mntn = mntn;
        this.year = year;
        this.month = month;
        this.day = day;
        this.time = time;
        this.distance = distance;
        this.isComplete = isComplete;
    }
    public void update (Mountain mntn, Integer year, Integer month, Integer day) {
        this.mntn = mntn;
        this.year = year;
        this.month = month;
        this.day = day;
    }

}
