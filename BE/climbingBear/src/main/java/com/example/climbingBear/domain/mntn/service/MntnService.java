package com.example.climbingBear.domain.mntn.service;

import com.example.climbingBear.domain.mntn.exception.NoExistFeatureException;
import com.example.climbingBear.domain.mntn.exception.NoExistMntnException;
import com.example.climbingBear.domain.mntn.dto.*;
import com.example.climbingBear.domain.mntn.entity.*;

import com.example.climbingBear.domain.mntn.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MntnService {

    private final MntnRepository mntnRepository;
    private final SpotRepository spotRepository;
    private final FeatureRepository featureRepository;
    private final PathRepository pathRepository;
    private final MntnPlaceRepository mntnPlaceRepository;

//    public MntnResDto mntnDetail(Long mntnSeq){
//        Mountain mntn = mntnRepository.findByMntnSeq((mntnSeq)).orElseThrow(() ->
//                new NoExistMntnException());
//        Spot spot = spotRepository.findByMntnNm(mntn).orElseThrow(() ->
//                new NoExistUserException());
//        MntnResDto mntnResDto = MntnResDto.ofSpot(spot);
//        return mntnResDto;
//    }

    @Transactional
    public List<MntnListResDto> findAllMountain(){
        List<Mountain>  mountains = mntnRepository.findAll(Sort.by(Sort.Direction.ASC, "mntnSeq"));
        return mountains.stream().map(MntnListResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public MntnDetailResDto getMntnDetail(Long mntnSeq){
        Mountain mntn = mntnRepository.findByMntnSeq(mntnSeq).orElseThrow(() ->
                new NoExistMntnException());
        List place = findMntnPlace(mntn);
        return MntnDetailResDto.ofMntnDetail(mntn, place);
    }

    public List<MntnPlaceListResDto> findMntnPlace(Mountain mntn){
        List<MountainPlace> mntnPlace = mntnPlaceRepository.findByMntn(mntn);
        return mntnPlace.stream().map(MntnPlaceListResDto::new).collect(Collectors.toList());
    }

    public List<MntnFeatureResDto> getMntnFeature(Long mntnSeq){
        Mountain mntn = mntnRepository.findByMntnSeq(mntnSeq).orElseThrow(() ->
                new NoExistMntnException());
        List<Feature> features = featureRepository.findByMntn(mntn);
//        List<Feature> features = featureRepository.findByMntn(mntn);
        for(Feature f : features){
            System.out.println(f.getFetureSeq());
            List paths = findMntnPath(f);
            f.setPaths(paths);
        }
        return features.stream().map(MntnFeatureResDto::new).collect(Collectors.toList());
    }

    public List<MntnPathListResDto> findMntnPath(Feature feature){
        List<Path> paths = pathRepository.findByFeature(feature);
        return paths.stream().map(MntnPathListResDto::new).collect(Collectors.toList());
    }

}

