package com.example.climbingBear.domain.mntn.dto;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.mntn.repository.PathRepository;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MntnPathJsonResDto {
    private Long mntnSeq;
    private String mntnName;
    private String pathUrl;
    private String spotUrl;

    public static MntnPathJsonResDto of(Mountain mntn){
        return MntnPathJsonResDto.builder()
                .mntnSeq(mntn.getMntnSeq())
                .mntnName(mntn.getMntnNm())
                .pathUrl("https://storage.googleapis.com/climbingbear/path"+mntn.getMntnSeq()+".json")
                .spotUrl("https://storage.googleapis.com/climbingbear/spot"+mntn.getMntnSeq()+".json")
                .build();
    }
}
