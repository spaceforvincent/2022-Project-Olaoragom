package com.example.climbingBear.domain.diary.contoller;

import com.example.climbingBear.domain.diary.dto.DiaryPostReqDto;
import com.example.climbingBear.domain.diary.dto.DiaryPostResDto;
import com.example.climbingBear.domain.diary.service.DiaryService;
import com.example.climbingBear.domain.user.dto.SignupReqDto;
import com.example.climbingBear.global.common.CommonResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
@Slf4j
public class DiaryController {
    private final DiaryService diaryService;

    @PostMapping
    @ApiOperation(value = "등산 계획 저장", notes = "year, month, day, mntnSeq 입력")
    public ResponseEntity<CommonResponse> saveDiary(@RequestBody DiaryPostReqDto dto, @RequestParam("id") String id) throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(diaryService.diarySave(dto, id)), HttpStatus.OK);
    }
}
