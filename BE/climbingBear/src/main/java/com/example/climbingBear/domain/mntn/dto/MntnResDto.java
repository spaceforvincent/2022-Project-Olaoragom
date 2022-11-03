//package com.example.climbingBear.domain.mntn.dto;
//
//import com.example.climbingBear.domain.mntn.entity.Mountain;
//import com.example.climbingBear.domain.mntn.entity.Spot;
//import com.fasterxml.jackson.annotation.JsonInclude;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.Column;
//import java.util.List;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class MntnResDto {
//
//    private Long mntnSeq;
//
//    private String mntnNm;
//
//    private String pointSpot;
//
//    private String mntnCode;
//
//    private Integer manageSp1;
//
//    private String manageSp2;
//
//    private String detailSpo;
//
//    private String mntnId;
//
//    private Float lat;
//
//    private Float lon;
//
//    public static  MntnResDto ofSpot(Spot spot){
//        return MntnResDto.builder()
//                .mntnSeq(spot.getMntnNm().getMntnSeq())
//                .mntnNm(spot.getMntnNm().getMntnNm())
//                .pointSpot(spot.getPointSpot())
//                .mntnCode(spot.getMntnCode())
//                .manageSp1(spot.getManageSp1())
//                .manageSp2(spot.getManageSp2())
//                .detailSpo(spot.getDetailSpo())
//                .mntnId(spot.getMntnId())
//                .lat(spot.getLat())
//                .lon(spot.getLon())
//                .build();
//    }
//
//}
