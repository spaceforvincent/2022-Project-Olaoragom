package com.example.climbingBear.domain.chat.dto;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import lombok.Data;

@Data
public class ChatRoomResDto {
    private Long roomSeq;
    private String roomName;
    private Long userSeq;
    private String nickname;

    public ChatRoomResDto(ChatRoom chatRoom){
        this.roomSeq = chatRoom.getChatRoomSeq();
        this.roomName = chatRoom.getRoomName();
        this.userSeq = chatRoom.getUser().getUserSeq();
        this.nickname = chatRoom.getUser().getNickname();
    }
}
