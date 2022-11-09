package com.example.climbingBear.domain.chat.controller;

import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.service.ChatService;
import com.example.climbingBear.domain.diary.dto.DiaryPostReqDto;
import com.example.climbingBear.global.common.CommonResponse;
import com.example.climbingBear.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {
    private final JwtProvider jwtProvider;
    private final ChatService chatService;
    @PostMapping
    @ApiOperation(value = "채팅방 생성", notes = "")
    public ResponseEntity<CommonResponse> saveDiary(HttpServletRequest request, @RequestBody ChatRoomPostReqDto dto) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(chatService.chatRoomSave(dto, userSeq)), HttpStatus.OK);
    }
}
