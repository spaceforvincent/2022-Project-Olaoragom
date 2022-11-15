package com.example.climbingBear.domain.chat.dto;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDto {

//    private String roomRealName;
    private String roomName;


    public ChatRoom create(User user) {
        return ChatRoom.builder()
                .roomRealName(UUID.randomUUID().toString())
                .roomName(this.roomName)
                .user(user)
                .build();

    }


}