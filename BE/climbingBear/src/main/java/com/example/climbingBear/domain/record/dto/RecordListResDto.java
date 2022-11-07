package com.example.climbingBear.domain.record.dto;

import com.example.climbingBear.domain.record.entity.Record;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Builder
@AllArgsConstructor
public class RecordListResDto {
    private Long recordSeq;
    private Integer year;
    private Integer month;
    private Integer day;

    public RecordListResDto (Record record){
        this.recordSeq = record.getRecordSeq();
        this.year = record.getYear();
        this.month = record.getMonth();
        this.day = record.getDay();
    }

}
