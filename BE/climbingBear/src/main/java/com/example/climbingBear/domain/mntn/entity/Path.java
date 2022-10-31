package com.example.climbingBear.domain.mntn.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Path {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "path_seq")
    private Long pathSeq;

    @ManyToOne
    @JoinColumn(name = "spot_seq")
    private Spot spotSeq;

    private Float lat;

    private Float lon;
}
