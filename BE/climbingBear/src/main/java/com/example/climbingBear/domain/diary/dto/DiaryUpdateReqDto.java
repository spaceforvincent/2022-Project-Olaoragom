package com.example.climbingBear.domain.diary.dto;

import lombok.Data;

@Data
public class DiaryUpdateReqDto {
    private Integer year;
    private Integer month;
    private Integer day;
    private Long mntnSeq;
    private Long diarySeq;
}
