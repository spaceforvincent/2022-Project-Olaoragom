package com.example.climbingBear.domain.chat.dto;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
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

    private String roomId;
    private String roomName;


    public static ChatRoomDto create(String name) {
        ChatRoomDto room = new ChatRoomDto();
        room.roomId = UUID.randomUUID().toString();
        room.roomName = name;
        return room;
    }
}