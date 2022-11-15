package com.example.climbingBear.domain.chat.repository;

import com.example.climbingBear.domain.chat.dto.ChatRoomDto;
import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.*;

@Repository
@Transactional
public class ChatRoomRepository {

    private Map<String, ChatRoomDto> chatRoomDTOMap;
    @Autowired
    private EntityManager em;
    @PostConstruct
    private void init(){
        chatRoomDTOMap = new LinkedHashMap<>();
    }

    public List<ChatRoomDto> findAllRooms(){
        //채팅방 생성 순서 최근 순으로 반환
        List<ChatRoomDto> result = new ArrayList<>(chatRoomDTOMap.values());
        Collections.reverse(result);

        return result;
    }

    public ChatRoomDto findRoomById(String id){
        return chatRoomDTOMap.get(id);
    }

    public ChatRoom createRoom(ChatRoomDto chatRoomDto, User user){

        // 집어넣을 데이터 설정
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setRoomName(chatRoomDto.getRoomName());
        chatRoom.setRoomRealName(UUID.randomUUID().toString());
        chatRoom.setUser(user);

        // DB insert
        em.persist(chatRoom);

        // primary key 생성
        em.flush();

        // 데이터 리턴
        return chatRoom;
    }
}
