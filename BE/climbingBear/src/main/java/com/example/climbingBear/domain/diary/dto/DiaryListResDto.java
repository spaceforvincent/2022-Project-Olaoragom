package com.example.climbingBear.domain.diary.dto;

import com.example.climbingBear.domain.diary.entity.Diary;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Builder
@AllArgsConstructor
public class DiaryListResDto {
    private Long diarySeq;
    private Integer year;
    private Integer month;
    private Integer day;
    private String mntnNm;

    public DiaryListResDto(Diary diary){
        this.diarySeq = diary.getDiarySeq();
        this.year = diary.getYear();
        this.month = diary.getMonth();
        this.day = diary.getDay();
        this.mntnNm = diary.getMntn().getMntnNm();
    }
}
