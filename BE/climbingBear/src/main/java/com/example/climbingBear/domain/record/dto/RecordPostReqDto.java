package com.example.climbingBear.domain.record.dto;

import com.example.climbingBear.domain.diary.entity.Diary;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import io.swagger.models.auth.In;
import lombok.Data;

@Data

public class RecordPostReqDto {
    private Integer year;
    private Integer month;
    private Integer day;
    private Long mntnSeq;
    private Float distance;
    private String time;

    public Record toRecordEntity(User user, Mountain mntn){
        return  Record.builder()
                .year(this.year)
                .month(this.month)
                .day(this.day)
                .mntn(mntn)
                .user(user)
                .distance(this.distance)
                .time(this.time)
                .build();
    }
}
