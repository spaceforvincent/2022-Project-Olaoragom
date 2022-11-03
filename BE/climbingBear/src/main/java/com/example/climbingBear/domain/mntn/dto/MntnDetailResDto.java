package com.example.climbingBear.domain.mntn.dto;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Builder
public class MntnDetailResDto {

    private String mntnNm;

    private String mntnSubnm;

    private String mntnRegion;

    private String mntnReason;

    private String mntnHeight;

    private String mntnDetails;

    private String mntnEtccourse;

    private String mntnTourisminf;

    private String mntnTransport;

    public static MntnDetailResDto ofMntnDetail(Mountain mntn){
        return MntnDetailResDto.builder()
                .mntnNm(mntn.getMntnNm())
                .mntnSubnm(mntn.getMntnSubnm())
                .mntnRegion(mntn.getMntnRegion())
                .mntnReason(mntn.getMntnReason())
                .mntnHeight(mntn.getMntnHeight())
                .mntnDetails(mntn.getMntnDetails())
                .mntnEtccourse(mntn.getMntnEtccourse())
                .mntnTourisminf(mntn.getMntnTourisminf())
                .mntnTransport(mntn.getMntnTransport())
                .build();
    }
}
