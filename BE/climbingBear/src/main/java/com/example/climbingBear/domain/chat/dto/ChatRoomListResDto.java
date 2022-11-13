package com.example.climbingBear.domain.chat.dto;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
public class ChatRoomListResDto {
    private Long chatRoomSeq;
    private String chatRoomTitle;

    private Long roomOwner;

    public ChatRoomListResDto (ChatRoom chatRoom){
        this.chatRoomSeq = chatRoom.getChatRoomSeq();
        this.chatRoomTitle = chatRoom.getRoomTitle();
        this.roomOwner = chatRoom.getUser().getUserSeq();
    }
}
