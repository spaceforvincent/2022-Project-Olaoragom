package com.example.climbingBear.domain.chat.entity;

import com.example.climbingBear.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoom {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomSeq;
    @ManyToOne
    private User user;
    private String title;

    @Builder
    public ChatRoom (User user, String title){
        this.user = user;
        this.title = title;
    }

}
