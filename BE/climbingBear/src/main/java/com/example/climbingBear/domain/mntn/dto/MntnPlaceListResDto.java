package com.example.climbingBear.domain.mntn.dto;

import com.example.climbingBear.domain.mntn.entity.MountainPlace;
import lombok.Data;

@Data
public class MntnPlaceListResDto {
    private String placeNm;
    private String placeContent;

    public MntnPlaceListResDto(MountainPlace mountainPlace){
        this.placeNm = mountainPlace.getPlaceNm();
        this.placeContent = mountainPlace.getPlaceContent();
    }
}
