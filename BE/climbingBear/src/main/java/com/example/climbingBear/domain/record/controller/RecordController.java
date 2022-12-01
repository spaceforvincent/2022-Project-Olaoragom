package com.example.climbingBear.domain.record.controller;

import com.example.climbingBear.domain.record.dto.RecordDetailReqDto;
import com.example.climbingBear.domain.record.dto.RecordPostReqDto;
import com.example.climbingBear.domain.record.service.RecordService;
import com.example.climbingBear.global.common.CommonResponse;
import com.example.climbingBear.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/mntn/record")
@RequiredArgsConstructor
@Slf4j
public class RecordController {
    private final JwtProvider jwtProvider;
    private final RecordService recordService;

    // 등산 기록 저장
    @PostMapping
    @ApiOperation(value = "등산 기록 저장", notes = "year, month, day, mntnSeq, time, distance 입력, header에 token 입력")
    public ResponseEntity<CommonResponse> createRecord(HttpServletRequest request, @RequestBody RecordPostReqDto dto) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(recordService.createRecord(dto, userSeq)), HttpStatus.OK);
    }
}
