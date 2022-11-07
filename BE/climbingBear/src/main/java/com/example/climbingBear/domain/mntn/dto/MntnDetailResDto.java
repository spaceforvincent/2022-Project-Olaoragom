package com.example.climbingBear.domain.mntn.dto;

import com.example.climbingBear.domain.mntn.entity.Feature;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

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

    private String mntnTransport;

    private List place;
    private String level;
    public static MntnDetailResDto ofMntnDetail(Mountain mntn, List place, Feature feature){
        return MntnDetailResDto.builder()
                .mntnNm(mntn.getMntnNm())
                .mntnSubnm(mntn.getMntnSubnm())
                .mntnRegion(mntn.getMntnRegion())
                .mntnReason(mntn.getMntnReason())
                .mntnHeight(mntn.getMntnHeight())
                .mntnDetails(mntn.getMntnDetails())
                .mntnEtccourse(mntn.getMntnEtccourse())
                .mntnTransport(mntn.getMntnTransport())
                .place(place)
                .level(feature.getPmtnDffl())
                .build();
    }
}
