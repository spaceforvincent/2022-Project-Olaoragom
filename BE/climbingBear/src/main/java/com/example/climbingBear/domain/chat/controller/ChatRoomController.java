package com.example.climbingBear.domain.chat.controller;

import com.example.climbingBear.domain.chat.dto.ChatRoomDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.chat.service.ChatService;
import com.example.climbingBear.domain.record.dto.DiaryPostReqDto;
import com.example.climbingBear.global.common.CommonResponse;
import com.example.climbingBear.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatService chatService;
    private final JwtProvider jwtProvider;

    // 모든 채팅방 목록 반환
    @GetMapping("/room-list")
    @ApiOperation(value = "채팅방 목록", notes = "")
    public ResponseEntity<CommonResponse> getRoomList(HttpServletRequest request) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(chatService.findAllRoom()), HttpStatus.OK);
    }

    // 채팅방 생성
    @PostMapping("/room")
    @ApiOperation(value = "채팅방 생성", notes = "roomName 입력, header에 token 입력")
    public ResponseEntity<CommonResponse> createRoom(HttpServletRequest request, @RequestBody ChatRoomPostReqDto dto) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(chatService.createRoom(dto, userSeq)), HttpStatus.OK);
    }

    // 채팅방 입장
    @GetMapping("/room/enter/{roomSeq}")
    @ApiOperation(value = "채팅방 입장", notes = "header에 token 입력")
    public ResponseEntity<CommonResponse> enterRoom(HttpServletRequest request, @PathVariable Long roomSeq) throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(chatService.findByRoomId(roomSeq)), HttpStatus.OK);
    }

    // 채팅방 삭제
    @DeleteMapping("/room")
    @ApiOperation(value = "채팅방 삭제")
    public ResponseEntity<CommonResponse> deleteRoom(HttpServletRequest request, @RequestParam("roomSeq")Long roomSeq) throws Exception {
        Long userSeq = jwtProvider.getUserSeqFromRequest(request);
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(chatService.deleteRoom(userSeq, roomSeq)), HttpStatus.OK);
    }
}