package com.example.climbingBear.domain.mntn.entity;

import lombok.Cleanup;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Mountain {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mntn_seq")
    private Long mntnSeq;

    @Column(name = "MNTN_NM")
    private String mntnNm;

    @Column(name = "mntn_subnm")
    private String mntnSubnm;

    @Column(name = "mntn_region")
    private String mntnRegion;

    @Column(name = "mntn_reason")
    private String mntnReason;

    @Column(name = "mntn_height")
    private String mntnHeight;

    @Column(name = "mntn_details")
    private String mntnDetails;

//    @Column(name = "mntn_overview")
//    private String mntnOverview;

    @Column(name = "mntn_etccourse")
    private String mntnEtccourse;

    @Column(name = "mntn_transport")
    private String mntnTransport;
}
