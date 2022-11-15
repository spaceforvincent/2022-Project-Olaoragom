package com.example.climbingBear.domain.chat.dto;

import com.example.climbingBear.domain.user.entity.User;
import lombok.Data;

@Data
public class ChatRoomDataDto {

//    private Long roomSeq;
    private String roomName;
    private Long userSeq;
    private String nickname;
}
