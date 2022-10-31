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
    @JoinColumn(name = "MNTN_NM")
    private Mountain mntnNm;

    private Integer FID;

    @Column(name = "POINT_SPOT")
    private String pointSpot;

    @Column(name = "MNTN_CODE")
    private String mntnCode;

    @Column(name = "MANAGE_SP1")
    private Integer manageSp1;

    @Column(name = "MANAGE_SP2")
    private String manageSp2;

    @Column(name = "DETAIL_SPO")
    private String detailSpo;

    @Column(name = "ECT_METER")
    private String ectMeter;

    @Column(name = "MNTN_ID")
    private String mntnId;

    @Column(name = "lat")
    private Float lat;

    @Column(name = "lon")
    private Float lon;
}
