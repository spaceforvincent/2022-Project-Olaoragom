package com.example.climbingBear.domain.diary.contoller;

import com.example.climbingBear.domain.diary.dto.DiaryPostReqDto;
import com.example.climbingBear.domain.diary.dto.DiaryPostResDto;
import com.example.climbingBear.domain.diary.service.DiaryService;
import com.example.climbingBear.domain.user.dto.SignupReqDto;
import com.example.climbingBear.domain.user.service.UserService;
import com.example.climbingBear.global.common.CommonResponse;
import com.example.climbingBear.global.jwt.AccessTokenInterceptor;
import com.example.climbingBear.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
@Slf4j
public class DiaryController {
    private final DiaryService diaryService;
    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final AccessTokenInterceptor accessTokenInterceptor;

    @PostMapping
    @ApiOperation(value = "등산 계획 저장", notes = "year, month, day, mntnSeq 입력, header에 token 입력")
    public ResponseEntity<CommonResponse> saveDiary(HttpServletRequest request, @RequestBody DiaryPostReqDto dto) throws Exception {
        Long userSeq = (Long) request.getAttribute("userSeq");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(diaryService.diarySave(dto, userSeq)), HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "등산 계획 조회", notes = "header에 token 입력")
    public ResponseEntity<CommonResponse> getDiary(HttpServletRequest request) throws Exception {
        Long userSeq = (Long) request.getAttribute("userSeq");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(diaryService.myDiarylist(userSeq)), HttpStatus.OK);
    }
}
