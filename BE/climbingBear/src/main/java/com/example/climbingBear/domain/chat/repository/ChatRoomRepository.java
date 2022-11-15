package com.example.climbingBear.domain.chat.repository;

import com.example.climbingBear.domain.chat.dto.ChatRoomDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomPostReqDto;
import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Repository
@Transactional
public class ChatRoomRepository {

    private Map<Long, ChatRoom> chatRoomMap;
    private final RoomRepository roomRepository;
    @Autowired
    private EntityManager em;

    public ChatRoomRepository(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @PostConstruct
    private void init(){
        chatRoomMap = new LinkedHashMap<>();
    }

    public List<ChatRoomDto> findAllRooms(){
        //채팅방 생성 순서 최근 순으로 반환
        List<ChatRoom> chatRooms = new ArrayList<>(roomRepository.findAll());
        System.out.println(chatRooms);
        return chatRooms.stream().map(ChatRoomDto::new).collect(Collectors.toList());
    }

    public ChatRoom findRoomById(Long id){
        ChatRoom chatRoom = roomRepository.findByRoomSeq(id).orElseThrow(() ->
                new NoExistUserException());
        return chatRoom;
    }

    public ChatRoom createRoom(ChatRoomPostReqDto dto, User user){

        // 집어넣을 데이터 설정
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setRoomName(dto.getRoomName());
        chatRoom.setRoomRealName(UUID.randomUUID().toString());
        chatRoom.setUser(user);

        // DB insert
        em.persist(chatRoom);

        // primary key 생성
        em.flush();

        // 방 관리자 생성
        chatRoomMap.put(chatRoom.getRoomSeq(), new ChatRoom());

        // 데이터 리턴
        return chatRoom;
    }
}
