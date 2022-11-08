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
    private Feature feature;

    @ManyToOne
    private Mountain mntn;

    private double lat;

    private double lon;
}
