package com.example.climbingBear.domain.mntn.controller;

import com.example.climbingBear.domain.mntn.dto.MntnDetailReqDto;
import com.example.climbingBear.domain.mntn.service.MntnService;
import com.example.climbingBear.global.common.CommonResponse;
import com.example.climbingBear.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/mntn")
@RequiredArgsConstructor
@Slf4j
public class MntnController {
    private final MntnService mntnService;
    private final JwtProvider jwtProvider;

    // 산 전체 목록 조회
    @GetMapping("/list")
    @ApiOperation(value = "산 목록 리스트", notes = "seq, name 제공")
    public ResponseEntity<?> getMntnList(HttpServletRequest request)throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.findAllMountain()), HttpStatus.OK);
    }

    // 특정 산 상세 정보 조회
    @GetMapping("/detail")
    @ApiOperation(value = "산 상세 정보", notes = "")
    public ResponseEntity<?> getMntnDetail(HttpServletRequest request, @RequestParam("mntnSeq")Long mntnSeq)throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.getMntnDetail(mntnSeq)), HttpStatus.OK);
    }

    // 특정 산 특징 정보 조회
    @GetMapping("/feature")
    @ApiOperation(value = "산 특징 정보", notes = "lt : 구간길이, uppl : 상행시간, godn : 하행시간, dffl : 난이도, path : 등산로")
    public ResponseEntity<?> getMntnFeature(HttpServletRequest request, @RequestParam("mntnSeq")Long mntnSeq)throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.getMntnFeature(mntnSeq)), HttpStatus.OK);
    }

    // 특정 산 등산로 정보 조회 : google drive 통해 json 파일 전송
    @GetMapping("/path")
    @ApiOperation(value = "산 등산로 json 정보", notes = "")
    public ResponseEntity<?> getMntnPath(HttpServletRequest request, @RequestParam("mntnSeq")Long mntnSeq)throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.getMntnPathList(mntnSeq)), HttpStatus.OK);
    }
}
