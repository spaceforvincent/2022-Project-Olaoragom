package com.example.climbingBear.domain.mntn.dto;

import com.example.climbingBear.domain.mntn.entity.Path;
import lombok.Data;

@Data
public class MntnPathListResDto {
    private double lat;
    private double lon;

    public MntnPathListResDto(Path path){
        this.lat = path.getLat();
        this.lon = path.getLon();
    }

}
