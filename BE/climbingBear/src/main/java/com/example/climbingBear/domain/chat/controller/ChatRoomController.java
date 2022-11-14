package com.example.climbingBear.domain.chat.controller;

import com.example.climbingBear.domain.chat.dto.ChatRoomDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomMap;
import com.example.climbingBear.domain.chat.service.ChatRoomService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatRoomController {

    // ChatService Bean 가져오기
    private final ChatRoomService chatServiceMain;

    // 채팅방 생성
    // 채팅방 생성 후 다시 / 로 return
    @PostMapping("/chat/createroom")
    @ApiOperation(value = "채팅방 생성", notes = "채팅방 생성 후 다시 /로 return")
    public String createRoom(@RequestParam("roomName") String name, RedirectAttributes rttr) {

        // log.info("chk {}", secretChk);

        // 매개변수 : 방 이름, 패스워드, 방 잠금 여부, 방 인원수
        ChatRoomDto room;

        room = chatServiceMain.createChatRoom(name);


        log.info("CREATE Chat Room [{}]", room);

        rttr.addFlashAttribute("roomName", room);
        return "redirect:/";
    }

    // 채팅방 입장 화면
    // 파라미터로 넘어오는 roomId 를 확인후 해당 roomId 를 기준으로
    // 채팅방을 찾아서 클라이언트를 chatroom 으로 보낸다.
    @GetMapping("/chat/room")
    @ApiOperation(value = "채팅방 입장", notes = "")
    public String roomDetail(Model model, @PathVariable String roomId) {

        log.info("roomId {}", roomId);

        ChatRoomDto room = ChatRoomMap.getInstance().getChatRooms().get(roomId);

        model.addAttribute("room", room);
        return "chatroom";
    }


    // 채팅방 삭제
    @ApiOperation(value = "채팅방 삭제", notes = "")
    @GetMapping("/chat/delRoom/{roomId}")
    public String delChatRoom(@PathVariable String roomId) {

        // roomId 기준으로 chatRoomMap 에서 삭제, 해당 채팅룸 안에 있는 사진 삭제
        chatServiceMain.delChatRoom(roomId);

        return "redirect:/";
    }

    // 유저 카운트
//    @GetMapping("/chat/chkUserCnt/{roomId}")
//    @ResponseBody
//    public boolean chUserCnt(@PathVariable String roomId) {
//
//        return chatServiceMain.chkRoomUserCnt(roomId);
//    }
}
