package com.example.climbingBear.domain.record.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DiaryPostResDto {
    private Long recordSeq;

    public static DiaryPostResDto of(Long recordSeq){
        return DiaryPostResDto.builder()
                .recordSeq(recordSeq)
                .build();
    }
}
