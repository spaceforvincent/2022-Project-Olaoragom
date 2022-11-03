package com.example.climbingBear.domain.diary.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DiaryUpdateResDto {
    private Long diarySeq;

    public static DiaryUpdateResDto of(Long diarySeq){
        return DiaryUpdateResDto.builder()
                .diarySeq(diarySeq)
                .build();
    }
}
