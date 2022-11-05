package com.example.climbingBear.domain.record.dto;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.ManyToOne;

@Data
@Builder
public class RecordDetailResDto {
    private Long recordSeq;
    private Long mntnSeq;
    private String mntnNm;
    private Integer year;
    private Integer month;
    private Integer day;
    private Float distance;
    private String time;
    public static RecordDetailResDto of(Record record){
        return RecordDetailResDto.builder()
                .recordSeq(record.getRecordSeq())
                .mntnSeq(record.getMntn().getMntnSeq())
                .mntnNm(record.getMntn().getMntnNm())
                .year(record.getYear())
                .month(record.getMonth())
                .day(record.getDay())
                .distance(record.getDistance())
                .time(record.getTime())
                .build();
    }
}
