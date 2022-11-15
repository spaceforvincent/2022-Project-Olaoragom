package com.example.climbingBear.domain.chat.entity;

import com.example.climbingBear.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomSeq;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "room_real_name")
    private String roomRealName;

    @ManyToOne
    private User user;

    @Builder
    private ChatRoom (String roomName, User user, String roomRealName){
        this.user = user;
        this.roomName = roomName;
        this.roomRealName = roomRealName;
    }

}
