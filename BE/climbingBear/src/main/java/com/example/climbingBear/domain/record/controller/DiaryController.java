package com.example.climbingBear.domain.record.controller;

import com.example.climbingBear.domain.record.dto.DiaryPostReqDto;
import com.example.climbingBear.domain.record.dto.DiaryUpdateReqDto;
import com.example.climbingBear.domain.record.service.DiaryService;
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
@RequestMapping("/diary")
@RequiredArgsConstructor
@Slf4j
public class DiaryController {
    private final DiaryService diaryService;
    private final JwtProvider jwtProvider;

    // 등산 계획 저장
    @PostMapping
    @ApiOperation(value = "등산 계획 저장", notes = "year, month, day, mntnSeq 입력, header에 token 입력")
    public ResponseEntity<CommonResponse> createDiary(HttpServletRequest request, @RequestBody DiaryPostReqDto dto) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(diaryService.createDiary(dto, userSeq)), HttpStatus.OK);
    }
    // 등산 계획 조회
    @GetMapping
    @ApiOperation(value = "등산 계획, 기록 조회", notes = "header에 token 입력")
    public ResponseEntity<CommonResponse> getDiary(HttpServletRequest request) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(diaryService.getDiarylist(userSeq)), HttpStatus.OK);
    }

    // 등산 계획 수정
    @PutMapping
    @ApiOperation(value = "등산 계획 수정", notes = "year, month, day, mntnSeq 입력, header에 token 입력")
    public ResponseEntity<CommonResponse> editDiary(HttpServletRequest request, @RequestBody DiaryUpdateReqDto dto) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(diaryService.updateDiary(dto, userSeq)), HttpStatus.OK);
    }

    // 등산 계획 삭제
    @DeleteMapping
    @ApiOperation(value = "등산 계획 삭제", notes = "params에 diarySeq 입력")
    public ResponseEntity<CommonResponse> deleteDiary(HttpServletRequest request, @RequestParam("diarySeq")Long diarySeq) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        diaryService.deleteDiary(userSeq, diarySeq);
        return null;
    }
}
