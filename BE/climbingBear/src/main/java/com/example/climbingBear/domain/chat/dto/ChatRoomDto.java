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

    private Long roomSeq;
    private String roomName;
    private String roomRealName;
    private Long hostUser;

    public ChatRoomDto(ChatRoom chatRoom){
        this.roomSeq = chatRoom.getRoomSeq();
        this.roomName = chatRoom.getRoomName();
        this.roomRealName = chatRoom.getRoomRealName();
        this.hostUser = chatRoom.getUser().getUserSeq();
    }
}