package com.example.climbingBear.domain.chat.controller;

import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.service.ChatService;

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
@RequestMapping("/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {
    private final JwtProvider jwtProvider;
    private final ChatService chatService;
    @PostMapping
    @ApiOperation(value = "채팅방 생성", notes = "채팅방 제목 입력, header에 token 입력")
    public ResponseEntity<CommonResponse> saveChatRoom(HttpServletRequest request, @RequestBody ChatRoomPostReqDto dto) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(chatService.chatRoomSave(dto, userSeq)), HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "채팅방 목록 조회", notes = "header에 token 입력")
    public ResponseEntity<CommonResponse> getChatRoomList(HttpServletRequest request) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(chatService.chatRoomList()), HttpStatus.OK);
    }

    @DeleteMapping
    @ApiOperation(value = "채팅방 삭제", notes = "")
    public ResponseEntity<CommonResponse> deleteChatRoom(HttpServletRequest request, @RequestParam Long chatRoomSeq) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        String result = chatService.chatRoomDelete(chatRoomSeq, userSeq);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(result), HttpStatus.OK);
    }
}
