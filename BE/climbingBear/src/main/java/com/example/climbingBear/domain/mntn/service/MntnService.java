package com.example.climbingBear.domain.mntn.service;

import com.example.climbingBear.domain.mntn.dto.MntnResDto;
import com.example.climbingBear.domain.mntn.entity.Mountain;

import com.example.climbingBear.domain.mntn.entity.Spot;
import com.example.climbingBear.domain.mntn.repository.MntnRepository;
import com.example.climbingBear.domain.mntn.repository.SpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MntnService {

    private final MntnRepository mntnRepository;
    private final SpotRepository spotRepository;

    public MntnResDto mntnDetail(Long mntnSeq){
        Mountain mntn = mntnRepository.findByMntnSeq((mntnSeq)).get();
        Spot spot = spotRepository.findByMntnNm(mntn).get();
        MntnResDto mntnResDto = MntnResDto.ofSpot(spot);
        return mntnResDto;

    }
}

