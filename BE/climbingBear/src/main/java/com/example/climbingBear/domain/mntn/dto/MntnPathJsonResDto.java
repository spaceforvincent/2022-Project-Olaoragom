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
    private String path;

    public static MntnPathJsonResDto of(Mountain mntn){
        return MntnPathJsonResDto.builder()
                .mntnSeq(mntn.getMntnSeq())
                .mntnName(mntn.getMntnNm())
                .path("https://storage.googleapis.com/climbingbear/path"+mntn.getMntnSeq()+".json")
                .build();
    }
}
