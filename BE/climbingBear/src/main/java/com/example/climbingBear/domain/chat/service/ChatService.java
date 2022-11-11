package com.example.climbingBear.domain.chat.service;

import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostResDto;
import com.example.climbingBear.domain.chat.entity.ChatRoom;
//import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.chat.repository.ChatRepository;
import com.example.climbingBear.domain.chat.repository.ChatRoomRepository;
import com.example.climbingBear.domain.mntn.exception.NoExistMntnException;
import com.example.climbingBear.domain.user.entity.User;
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

    private Map<String, ChatRoom> chatRooms;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;

    public ChatRoomPostResDto createRoom (ChatRoomPostReqDto dto, Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        ChatRoom chatRoom = dto.toChatEntity(user);
        chatRooms.put(chatRoom.getRoomRealName(), chatRoom);
        chatRepository.save(chatRoom);
        return ChatRoomPostResDto.of(chatRoom.getChatRoomSeq());
    }

    @PostConstruct
    //의존관게 주입완료되면 실행되는 코드
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    //채팅방 불러오기
    public List<ChatRoom> findAllRoom() {
        //채팅방 최근 생성 순으로 반환
        List<ChatRoom> result = new ArrayList<>(chatRepository.findAll());
        Collections.reverse(result);
        return result;
    }

    //채팅방 하나 불러오기
    public ChatRoom findById(String roomId) {
        return chatRooms.get(roomId);
    }
//
//    //채팅방 생성
//    public ChatRoom createRoom(String name) {
////        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
////                new NoExistMntnException());
//        ChatRoom chatRoom = ChatRoom.create(name);
////        chatRooms.put(chatRoom.getRoomId(), chatRoom);
//        chatRepository.save(chatRooms.put(chatRoom.getRoomId(), chatRoom));
//        return chatRoom;
//    }
}
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class ChatService {
//    private final ChatRepository chatRepository;
//    private final UserRepository userRepository;
//
//    public ChatRoomPostResDto chatRoomSave (ChatRoomPostReqDto dto, Long userSeq) throws Exception {
//        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
//                new NoExistUserException());
//        ChatRoom chatRoom = dto.toChatEntity(user);
//        chatRepository.save(chatRoom);
//        return ChatRoomPostResDto.of(chatRoom.getChatRoomSeq());
//    }
//
//    public List<ChatRoomListResDto> chatRoomList () throws Exception {
//        List<ChatRoom> chatRooms = chatRepository.findAll();
//        return chatRooms.stream().map(ChatRoomListResDto::new).collect(Collectors.toList());
//    }
//
//    public String chatRoomDelete (Long chatRoomSeq, Long userSeq) throws Exception {
//        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
//                new NoExistUserException());
//        ChatRoom chatRoom = chatRepository.findByChatRoomSeq(chatRoomSeq).orElseThrow(() ->
//                new NoExistChatRoomException());
//        if (chatRoom.getUser().getUserSeq() == user.getUserSeq()){
//            chatRepository.delete(chatRoom);
//            return "삭제 완료됐습니다.";
//        } else {
//            throw new NoExistChatRoomException();
//        }
//    }
//}
