package com.example.climbingBear.domain.mntn.dto;

import com.example.climbingBear.domain.mntn.entity.Feature;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.mntn.entity.Path;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import java.util.List;

@Data
public class MntnFeatureResDto {

    private Long fetureSeq;

    private Float pmntnLt;

    private Integer pmntnUppl;

    private Integer pmntnGodn;

    private String pmtnDffl;
    private List<Path> paths;

    public MntnFeatureResDto (Feature feature){
        this.fetureSeq = feature.getFetureSeq();
        this.pmntnGodn = feature.getPmntnGodn();
        this.pmntnLt = feature.getPmntnLt();
        this.pmntnUppl = feature.getPmntnUppl();
        this.pmtnDffl = feature.getPmtnDffl();
        this.paths = feature.getPaths();
    }
//    private List paths;

//    public static MntnFeatureResDto ofMntnFeature(Feature feature){
//        return MntnFeatureResDto.builder()
//                .fetureSeq(feature.getFetureSeq())
//                .pmntnLt(feature.getPmntnLt())
//                .pmntnUppl(feature.getPmntnUppl())
//                .pmntnGodn(feature.getPmntnGodn())
//                .pmtnDffl(feature.getPmtnDffl())
//                .paths(paths)
//                .build();
//    }
}
