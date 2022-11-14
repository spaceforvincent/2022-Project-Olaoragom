package com.example.climbingBear.domain.chat.dto;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.user.entity.User;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class ChatRoomPostReqDto {
    private String roomName;

    public ChatRoom toChatRoomEntity (User user){
        return ChatRoom.builder()
                .user(user)
                .roomName(this.roomName)
                .build();
    }
}
