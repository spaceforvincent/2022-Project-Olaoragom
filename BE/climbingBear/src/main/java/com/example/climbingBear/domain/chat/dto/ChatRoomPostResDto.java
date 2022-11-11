package com.example.climbingBear.domain.chat.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRoomPostResDto {
    private Long chatRoomSeq;

    public static ChatRoomPostResDto of(Long chatRoomSeq){
        return ChatRoomPostResDto.builder()
                .chatRoomSeq(chatRoomSeq)
                .build();
    }

}
