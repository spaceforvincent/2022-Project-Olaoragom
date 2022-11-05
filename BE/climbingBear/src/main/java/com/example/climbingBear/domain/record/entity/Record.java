package com.example.climbingBear.domain.record.entity;

import com.example.climbingBear.domain.mntn.entity.Mountain;

import javax.persistence.*;

@Entity
public class Record {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_seq")
    private Long recordSeq;

    @ManyToOne
    private Mountain mntn;

    private Integer year;
    private Integer month;
    private Integer day;
    private Float distance;

}
