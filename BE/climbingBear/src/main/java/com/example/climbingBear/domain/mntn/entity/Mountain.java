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
}
