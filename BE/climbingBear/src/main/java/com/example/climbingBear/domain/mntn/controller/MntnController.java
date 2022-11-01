package com.example.climbingBear.domain.mntn.controller;

import com.example.climbingBear.domain.mntn.service.MntnService;
import com.example.climbingBear.global.common.CommonResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/mntn")
@RequiredArgsConstructor
@Slf4j
public class MntnController {
    private final MntnService mntnService;

    @GetMapping("/main")
    @ApiOperation(value = "산 스팟 정보")
    public ResponseEntity<CommonResponse> getMntnSpot(@RequestParam("mntn_seq") Long mntnSeq) throws IOException {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.mntnDetail(mntnSeq)), HttpStatus.OK);
    }

    @GetMapping("/list")
    @ApiOperation(value = "산 목록 리스트", notes = "seq, name 제공")
    public ResponseEntity<?> getMntnList(@RequestParam("id") String id)throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.findAllMountain(id)), HttpStatus.OK);
    }
}
