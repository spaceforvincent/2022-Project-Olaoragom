package com.example.climbingBear.domain.chat.entity;

import com.example.climbingBear.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoom {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomSeq;

    @Column(name = "room_name")
    private String roomName;

    @ManyToOne
    private User user;

    @Builder
    private ChatRoom (String roomName, User user){
        this.user = user;
        this.roomName = roomName;
    }

}
