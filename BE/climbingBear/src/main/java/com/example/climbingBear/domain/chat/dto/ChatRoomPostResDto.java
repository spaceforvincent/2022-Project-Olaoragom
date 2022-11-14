package com.example.climbingBear.domain.chat.dto;

import com.example.climbingBear.domain.record.dto.DiaryPostResDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRoomPostResDto {
    private Long roomSeq;

    public static ChatRoomPostResDto of(Long roomSeq){
        return ChatRoomPostResDto.builder()
                .roomSeq(roomSeq)
                .build();
    }
}
