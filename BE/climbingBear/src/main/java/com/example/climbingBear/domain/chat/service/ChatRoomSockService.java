package com.example.climbingBear.domain.chat.service;

import com.example.climbingBear.domain.chat.dto.ChatRoomResDto;
import com.example.climbingBear.domain.chat.repository.ChatRoomRepository;
import com.example.climbingBear.domain.chat.repository.SocketRepository;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import com.example.climbingBear.domain.user.repository.UserRepository;
import com.example.climbingBear.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomSockService {
    private final ChatRoomRepository chatRoomRepository;
    private final SocketRepository socketRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(ChatRoomSockService.class);

    // 방 입장 메시지 처리
    public ChatRoomResDto joinRoom(Long roomSeq, Long userSeq){

        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        // 방에 유저 추가
        socketRepository.joinRoom(roomSeq, user);

        // 내부 객체 생성
        ChatRoomResDto roomInfo = new ChatRoomResDto(socketRepository.getRoomInfo(roomSeq));
//        roomInfo.setParticipants(roomRepo.getAllUsersOfRoom(roomSeq).size());

        // { roominfo, gameinfo } 데이터 리턴
        return roomInfo;
    }


}
