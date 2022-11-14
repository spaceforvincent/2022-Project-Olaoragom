package com.example.climbingBear.domain.chat.service;

import com.example.climbingBear.domain.chat.dto.ChatRoomDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomMap;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Getter
@Setter
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {

    private final MsgChatService msgChatService;

    // 전체 채팅방 조회
    public List<ChatRoomDto> findAllRoom(){
        // 채팅방 생성 순서를 최근순으로 반환
        List<ChatRoomDto> chatRooms = new ArrayList<>(ChatRoomMap.getInstance().getChatRooms().values());
        Collections.reverse(chatRooms);

        return chatRooms;
    }

    // roomID 기준으로 채팅방 찾기
    public ChatRoomDto findRoomById(String roomId){
        return ChatRoomMap.getInstance().getChatRooms().get(roomId);
    }

    // roomName 로 채팅방 만들기
    public ChatRoomDto createChatRoom(String roomName){

        ChatRoomDto room;
        room = msgChatService.createChatRoom(roomName);
        // 채팅방 타입에 따라서 사용되는 Service 구분
        return room;
    }


    // 채팅방 인원+1
    public void plusUserCnt(String roomId){
        log.info("cnt {}",ChatRoomMap.getInstance().getChatRooms().get(roomId).getUserCount());
        ChatRoomDto room = ChatRoomMap.getInstance().getChatRooms().get(roomId);
        room.setUserCount(room.getUserCount()+1);
    }

    // 채팅방 인원-1
    public void minusUserCnt(String roomId){
        ChatRoomDto room = ChatRoomMap.getInstance().getChatRooms().get(roomId);
        room.setUserCount(room.getUserCount()-1);
    }


    // 채팅방 삭제
    public void delChatRoom(String roomId){

        try {
            // 채팅방 타입에 따라서 단순히 채팅방만 삭제할지 업로드된 파일도 삭제할지 결정
            ChatRoomMap.getInstance().getChatRooms().remove(roomId);
            log.info("삭제 완료 roomId : {}", roomId);
        } catch (Exception e) { // 만약에 예외 발생시 확인하기 위해서 try catch
            System.out.println(e.getMessage());
        }
    }

}
