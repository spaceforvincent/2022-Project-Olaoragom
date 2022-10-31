package com.example.climbingBear.domain.mntn.controller;

import com.example.climbingBear.domain.mntn.dto.MntnReqDto;
import com.example.climbingBear.domain.mntn.service.MntnService;
import com.example.climbingBear.domain.user.dto.SignupReqDto;
import com.example.climbingBear.global.common.CommonResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/mntn")
@RequiredArgsConstructor
@Slf4j
public class SpotController {
    private final MntnService mntnService;

    @GetMapping("/main")
    @ApiOperation(value = "산 스팟 정보")
    public ResponseEntity<CommonResponse> getMntnSpot(@RequestParam("mntn_seq") Long mntnSeq) throws IOException {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(mntnService.mntnDetail(mntnSeq)), HttpStatus.OK);
    }
}
