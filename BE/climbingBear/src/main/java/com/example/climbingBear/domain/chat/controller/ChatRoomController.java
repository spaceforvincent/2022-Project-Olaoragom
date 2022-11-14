package com.example.climbingBear.domain.chat.controller;

import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.service.ChatRoomService;
import com.example.climbingBear.domain.user.dto.SignupReqDto;
import com.example.climbingBear.domain.user.service.UserService;
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
@RequestMapping("/chat-room")
@RequiredArgsConstructor
@Slf4j
public class ChatRoomController {
    private final UserService userService;
    private final ChatRoomService chatRoomService;
    private final JwtProvider jwtProvider;


    @PostMapping()
    @ApiOperation(value = "채팅방 생성", notes = "roomName 입력")
    public ResponseEntity<CommonResponse> signUpUser(HttpServletRequest request, @RequestBody ChatRoomPostReqDto dto) throws Exception {
        Long userSeq = (Long) jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(chatRoomService.saveChatRoom(dto, userSeq)), HttpStatus.OK);
    }
    @GetMapping()
    @ApiOperation(value = "채팅방 목록 조회", notes = "roomName 입력")
    public ResponseEntity<CommonResponse> signUpUser(HttpServletRequest request) throws Exception {
        Long userSeq = (Long) jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(chatRoomService.listChatRoom(userSeq)), HttpStatus.OK);
    }
}
