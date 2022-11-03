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

//    @GetMapping("/main")
//    @ApiOperation(value = "산 스팟 정보")
//    public ResponseEntity<CommonResponse> getMntnSpot(@RequestParam("mntn_seq") Long mntnSeq) throws IOException {
//        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.mntnDetail(mntnSeq)), HttpStatus.OK);
//    }

    @GetMapping("/list")
    @ApiOperation(value = "산 목록 리스트", notes = "seq, name 제공")
    public ResponseEntity<?> getMntnList(HttpServletRequest request)throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.findAllMountain()), HttpStatus.OK);
    }

    @GetMapping("/detail")
    @ApiOperation(value = "산 상세 정보", notes = "")
    public ResponseEntity<?> getMntnList(HttpServletRequest request, @RequestParam("mntnSeq")Long mntnSeq)throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.getMntnDetail(mntnSeq)), HttpStatus.OK);
    }
}
