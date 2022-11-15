package com.example.climbingBear.domain.chat.controller;

import com.example.climbingBear.domain.chat.dto.ChatRoomListResDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomResDto;
import com.example.climbingBear.domain.chat.service.ChatRoomService;
import com.example.climbingBear.domain.chat.service.ChatRoomSockService;
import com.example.climbingBear.domain.user.dto.SignupReqDto;
import com.example.climbingBear.domain.user.service.UserService;
import com.example.climbingBear.global.common.CommonResponse;
import com.example.climbingBear.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/chat-room")
@RequiredArgsConstructor
@Slf4j
public class ChatRoomController {
    private final UserService userService;
    private final ChatRoomService chatRoomService;
    private final ChatRoomSockService chatRoomSockService;
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

//    @PostMapping("/{room-seq}/join")
//    @ApiOperation(value = "방 입장", notes = "방 입장")
//    public ResponseEntity<ChatRoomResDto> joinRoom(HttpServletRequest request, @PathVariable("room-seq") Long roomSeq) throws Exception {
//        Long userSeq = (Long) jwtProvider.getUserSeqFromRequest(request);
//        log.info("[Room] 유저({}) 방 ({}) 입장", userSeq, roomSeq);
//        // 방 입장
//        return new ResponseEntity<ChatRoomResDto>((MultiValueMap<String, String>) chatRoomSockService.joinRoom(roomSeq, userSeq), HttpStatus.OK);
//    }
}
