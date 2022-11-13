package com.example.climbingBear.domain.record.dto;


import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class DiaryPostReqDto {
    private Integer year;
    private Integer month;
    private Integer day;
    private Long mntnSeq;

    public Record toDiaryEntity(User user, Mountain mntn){
        return Record.builder()
                .year(this.year)
                .month(this.month)
                .day(this.day)
                .user(user)
                .mntn(mntn)
                .isComplete(false)
                .build();
    }
}
