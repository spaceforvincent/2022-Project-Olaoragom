package com.example.climbingBear.domain.chat.service;

import com.example.climbingBear.domain.chat.dto.ChatRoomListResDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostResDto;
import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.chat.repository.ChatRoomRepository;
import com.example.climbingBear.domain.record.dto.DiaryListResDto;
import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import com.example.climbingBear.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatRoomService {
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomPostResDto saveChatRoom (ChatRoomPostReqDto dto, Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        ChatRoom chatRoom = dto.toChatRoomEntity(user);
        chatRoomRepository.save(chatRoom);

        return ChatRoomPostResDto.of(chatRoom.getChatRoomSeq());
    }

    public List<ChatRoomListResDto> listChatRoom (Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        List<ChatRoom> chatRooms = chatRoomRepository.findAll();
        return chatRooms.stream().map(ChatRoomListResDto::new).collect(Collectors.toList());
    }
}
