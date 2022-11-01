package com.example.climbingBear.domain.mntn.dto;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import lombok.Data;

@Data
public class MntnListResDto {
    private Long mntnSeq;
    private String mntnNm;

    public MntnListResDto(Mountain mntn){
        this.mntnSeq = mntn.getMntnSeq();
        this.mntnNm = mntn.getMntnNm();
    }
}
