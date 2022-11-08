package com.example.climbingBear.domain.record.controller;

import com.example.climbingBear.domain.record.dto.RankByMonthReqDto;
import com.example.climbingBear.domain.record.service.ChallengeService;
import com.example.climbingBear.global.common.CommonResponse;
import com.example.climbingBear.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/chellenge")
@RequiredArgsConstructor
@Slf4j
public class ChallengeController {

    private final JwtProvider jwtProvider;
    private final ChallengeService challengeService;

    @GetMapping("/month")
    @ApiOperation(value = "월별 등산 거리 랭킹", notes = "header에 token 입력")
    public List getMonthRank(HttpServletRequest request, @RequestParam Integer year, @RequestParam Integer month) throws Exception {
        return challengeService.rankByMonth(year, month);
    }
    @GetMapping("/total")
    @ApiOperation(value = "월별 등산 거리 랭킹", notes = "header에 token 입력")
    public List getTotalRank(HttpServletRequest request) throws Exception {
        return challengeService.rankAll();
    }
}
