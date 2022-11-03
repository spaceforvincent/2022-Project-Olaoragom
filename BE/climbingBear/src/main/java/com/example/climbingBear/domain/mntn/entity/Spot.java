package com.example.climbingBear.domain.mntn.entity;

import lombok.Getter;
import springfox.documentation.spring.web.json.Json;

import javax.persistence.*;
import java.util.Dictionary;

@Entity
@Getter
public class Spot {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spot_seq")
    private Long spotSeq;

    @ManyToOne
    private Mountain mntn;

    @Column(name = "spot_nm")
    private String spotNm;

    @Column(name = "spot_num")
    private String spotNum;

    @Column(name = "lat")
    private Float lat;

    @Column(name = "lon")
    private Float lon;
}
