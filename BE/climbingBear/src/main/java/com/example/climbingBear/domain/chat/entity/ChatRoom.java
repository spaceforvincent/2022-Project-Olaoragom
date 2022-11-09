package com.example.climbingBear.domain.chat.entity;

import com.example.climbingBear.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Builder
public class ChatRoom {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomSeq;

    @ManyToOne
    private User user;

    private String title;

}
