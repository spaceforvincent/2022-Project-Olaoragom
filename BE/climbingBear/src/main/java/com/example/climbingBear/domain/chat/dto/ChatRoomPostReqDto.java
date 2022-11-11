package com.example.climbingBear.domain.chat.dto;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.user.entity.User;
import lombok.Data;

import java.util.UUID;

@Data
public class ChatRoomPostReqDto {

    private String roomTitle;

    public ChatRoom toChatEntity(User user){
        return ChatRoom.builder()
                .user(user)
                .roomTitle(this.roomTitle)
                .roomRealName(UUID.randomUUID().toString())
                .build();
    }
}
