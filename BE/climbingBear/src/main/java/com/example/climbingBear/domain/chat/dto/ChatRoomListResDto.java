package com.example.climbingBear.domain.chat.dto;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
@Getter
@AllArgsConstructor
public class ChatRoomListResDto {

    private Long roomSeq;
    private String roomName;
    private Long hostUser;
    private String hostNickname;

    public ChatRoomListResDto (ChatRoom chatRoom){
        this.roomSeq = chatRoom.getChatRoomSeq();
        this.roomName = chatRoom.getRoomName();
        this.hostUser = chatRoom.getUser().getUserSeq();
        this.hostNickname = chatRoom.getUser().getNickname();
    }
}
