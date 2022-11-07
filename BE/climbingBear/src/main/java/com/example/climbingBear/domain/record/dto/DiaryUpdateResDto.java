package com.example.climbingBear.domain.record.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DiaryUpdateResDto {
    private Long recordSeq;

    public static DiaryUpdateResDto of(Long recordSeq){
        return DiaryUpdateResDto.builder()
                .recordSeq(recordSeq)
                .build();
    }
}
