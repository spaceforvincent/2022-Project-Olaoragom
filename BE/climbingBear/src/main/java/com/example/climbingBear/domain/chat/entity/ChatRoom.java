package com.example.climbingBear.domain.chat.entity;

import com.example.climbingBear.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.annotation.sql.DataSourceDefinition;
import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class ChatRoom {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomSeq;
    private String roomRealName;
    private String roomTitle;
    @ManyToOne
    @JoinColumn(name = "user_user_seq")
    private User user;



    @Builder
    public  ChatRoom (String roomTitle, User user, String roomRealName) {
        this.roomRealName = roomRealName;
        this.user = user;
        this.roomTitle = roomTitle;

    }

}