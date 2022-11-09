package com.example.climbingBear.domain.chat.service;

import com.example.climbingBear.domain.chat.dto.ChatRoomListResDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostResDto;
import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.chat.exception.NoExistChatRoomException;
import com.example.climbingBear.domain.chat.repository.ChatRepository;
import com.example.climbingBear.domain.diary.dto.DiaryListResDto;
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
public class ChatService {
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public ChatRoomPostResDto chatRoomSave (ChatRoomPostReqDto dto, Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        ChatRoom chatRoom = dto.toChatEntity(user);
        chatRepository.save(chatRoom);
        return ChatRoomPostResDto.of(chatRoom.getChatRoomSeq());
    }

    public List<ChatRoomListResDto> chatRoomList () throws Exception {
        List<ChatRoom> chatRooms = chatRepository.findAll();
        return chatRooms.stream().map(ChatRoomListResDto::new).collect(Collectors.toList());
    }

    public void chatRoomDelete (Long chatRoomSeq, Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        ChatRoom chatRoom = chatRepository.findByChatRoomSeq(chatRoomSeq).orElseThrow(() ->
                new NoExistChatRoomException());
        if (chatRoom.getUser().getUserSeq() == user.getUserSeq()){
            chatRepository.delete(chatRoom);
        } else {
            throw new NoExistChatRoomException();
        }
    }
}
