package com.example.climbingBear.domain.diary.dto;

import com.example.climbingBear.domain.user.dto.SignupResDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DiaryPostResDto {
    private Long diarySeq;

    public static DiaryPostResDto of(Long diarySeq){
        return DiaryPostResDto.builder()
                .diarySeq(diarySeq)
                .build();
    }
}
