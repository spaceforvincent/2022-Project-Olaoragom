package com.example.climbingBear.domain.chat.service;

import com.example.climbingBear.domain.chat.dto.ChatRoomDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostResDto;
import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.chat.repository.ChatRoomRepository;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import com.example.climbingBear.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {


//    private Map<String, ChatRoom> chatRooms;
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;

//    @PostConstruct
//    //의존관게 주입완료되면 실행되는 코드
//    private void init() {
//        chatRooms = new LinkedHashMap<>();
//    }

    //채팅방 불러오기
    public List<ChatRoomDto> findAllRoom() {
        //채팅방 최근 생성 순으로 반환
        List<ChatRoomDto> result = chatRoomRepository.findAllRooms();
        System.out.println(result);
        Collections.reverse(result);
        return result;
    }

    //채팅방 하나 불러오기
    public ChatRoomDto findByRoomId (Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findRoomById(roomId);
        System.out.println("CHATROOM : " + chatRoom);
        ChatRoomDto chatRoomDto = new ChatRoomDto(chatRoom);
        System.out.println("DTO : " + chatRoomDto);
        return chatRoomDto;
    }

    //채팅방 생성
    public ChatRoomPostResDto createRoom(ChatRoomPostReqDto dto, Long userSeq) {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());

        // 방 정보 생성, DB에 넣기
        ChatRoom chatRoom = chatRoomRepository.createRoom(dto, user);
        chatRoom.setRoomSeq(chatRoom.getRoomSeq());


        return ChatRoomPostResDto.of(chatRoom.getRoomSeq());
    }
}