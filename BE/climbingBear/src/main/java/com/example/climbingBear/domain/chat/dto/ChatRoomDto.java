package com.example.climbingBear.domain.chat.dto;

import com.sun.istack.NotNull;
import lombok.*;

import java.util.Map;

@Data
@Builder
@EqualsAndHashCode
@Getter
@Setter
public class ChatRoomDto {
    @NotNull
    private String roomId; // 채팅방 아이디
    private String roomName; // 채팅방 이름
    private int userCount; // 채팅방 인원수

    // ChatRoomDto 클래스는 하나로 가되 서비스를 나누었음
    private Map<String, ?> userList;
}
