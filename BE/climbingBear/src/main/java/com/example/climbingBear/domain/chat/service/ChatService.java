package com.example.climbingBear.domain.chat.service;

import com.example.climbingBear.domain.chat.dto.ChatRoomDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostResDto;
import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.chat.exception.NoExistChatRoomException;
import com.example.climbingBear.domain.chat.exception.NoPermissoinChatRoomException;
import com.example.climbingBear.domain.chat.repository.ChatRoomRepository;
import com.example.climbingBear.domain.chat.repository.RoomRepository;
import com.example.climbingBear.domain.record.Exception.NoExistDiaryException;
import com.example.climbingBear.domain.record.Exception.NoPermissionDeleteDiaryException;
import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import com.example.climbingBear.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final RoomRepository roomRepository;


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

    // 채팅방 삭제
    public ChatRoomPostResDto deleteRoom(Long userSeq, Long roomSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        ChatRoom chatRoom = roomRepository.findByRoomSeq(roomSeq).orElseThrow(() ->
                new NoExistChatRoomException());
        if (user.getUserSeq() == chatRoom.getUser().getUserSeq()){
            roomRepository.delete(chatRoom);
            return ChatRoomPostResDto.of(chatRoom.getRoomSeq());
        } else {
            throw new NoPermissoinChatRoomException();
        }
    }
}