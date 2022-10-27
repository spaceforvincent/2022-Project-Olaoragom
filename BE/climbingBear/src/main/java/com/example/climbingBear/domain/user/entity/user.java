package com.example.climbingBear.domain.user.entity;

import javax.persistence.*;

@Entity
public class user {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private long userSeq;
    private String id;
    private String pw;
    private String nickname;
}
