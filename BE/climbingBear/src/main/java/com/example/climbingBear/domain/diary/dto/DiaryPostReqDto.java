package com.example.climbingBear.domain.diary.dto;

import com.example.climbingBear.domain.diary.entity.Diary;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.user.entity.User;
import lombok.Data;

@Data
public class DiaryPostReqDto {
    private Integer year;
    private Integer month;
    private Integer day;
    private Long mntnSeq;

    public Diary toDiaryEntity(User user, Mountain mntn){
        return Diary.builder()
                .year(this.year)
                .month(this.month)
                .day(this.day)
                .user(user)
                .mntn(mntn)
                .build();

    }
}
