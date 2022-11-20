package com.example.climbingBear.domain.board;

import com.example.climbingBear.domain.record.dto.DiaryPostReqDto;
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
@RequestMapping("/board")
@RequiredArgsConstructor
@Slf4j
public class BoardController {

    private final BoardService boardService;
    private final JwtProvider jwtProvider;


    @PostMapping
    @ApiOperation(value = "게시글 저장", notes = "")
    public ResponseEntity<CommonResponse> saveDiary(HttpServletRequest request, @RequestBody BoardPostReqDto dto) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(boardService.saveBoard(dto, userSeq)), HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "게시글 조회", notes = "")
    public ResponseEntity<CommonResponse> saveDiary(HttpServletRequest request) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(boardService.myBoardList(userSeq)), HttpStatus.OK);
    }
}
