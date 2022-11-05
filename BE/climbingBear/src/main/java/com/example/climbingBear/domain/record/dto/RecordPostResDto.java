package com.example.climbingBear.domain.record.dto;

import com.example.climbingBear.domain.diary.dto.DiaryPostResDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecordPostResDto {
    private Long recordSeq;
    public static RecordPostResDto of(Long recordSeq){
        return RecordPostResDto.builder()
                .recordSeq(recordSeq)
                .build();
    }
}
