package com.example.climbingBear.domain.record.dto;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.record.entity.Record;
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
    private boolean isComplete;
    private String time;
    private Float distance;


    public DiaryListResDto(Record record){
        this.diarySeq = record.getRecordSeq();
        this.year = record.getYear();
        this.month = record.getMonth();
        this.day = record.getDay();
        this.mntnNm = record.getMntn().getMntnNm();
        this.isComplete = record.isComplete();
        this.time = record.getTime();
        this.distance = record.getDistance();
    }

}
