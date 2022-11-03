package com.example.climbingBear.domain.mntn.dto;

import com.example.climbingBear.domain.mntn.entity.Path;
import lombok.Data;

@Data
public class MntnPathListResDto {
    private float lat;
    private float lon;

    public MntnPathListResDto(Path path){
        this.lat = path.getLat();
        this.lon = path.getLon();
    }

}
