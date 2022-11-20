package com.example.climbingBear.domain.board;

import com.example.climbingBear.domain.chat.dto.ChatRoomPostResDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardPostResDto {
    private Long roomSeq;

    public static BoardPostResDto of(Long roomSeq){
        return BoardPostResDto.builder()
                .roomSeq(roomSeq)
                .build();
    }
}
