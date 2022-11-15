package com.example.climbingBear.domain.chat.repository;

import com.example.climbingBear.domain.chat.dto.ChatRoomDataDto;
import com.example.climbingBear.domain.chat.dto.ChatRoomResDto;
import com.example.climbingBear.domain.chat.dto.RoomManager;
import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.mntn.exception.NoExistMntnException;
import com.example.climbingBear.domain.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@Transactional
@Slf4j
public class SocketRepository {

    private final ChatRoomRepository chatRoomRepository;
    public SocketRepository(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }
    // db 접근을 위한 entity manager
    @Autowired
    private EntityManager em;
    // 방별 정보를 담고 있는 map
    private Map<Integer, RoomManager> map = new ConcurrentHashMap<>();

    public void joinRoom(Long roomSeq, User user){
        ChatRoom chatRoom = chatRoomRepository.findByChatRoomSeq(roomSeq).orElseThrow(() ->
                new NoExistMntnException());
        ChatRoomResDto dummy = new ChatRoomResDto(chatRoom);
        dummy.setNickname(user.getNickname());
        dummy.setUserSeq(user.getUserSeq());
//        dummy.setRoomName(chatRoom.getRoomName());
        addUserSock(roomSeq, user.getUserSeq(), dummy);
    }
    public void addUserSock(Long roomSeq, Long userSeq, ChatRoomResDto message){
//        log.info("[Room Repo {}] {} 유저 추가", roomSeq, userSeq);
        map.get(roomSeq).addUser(userSeq, message);
    }

    // 방 상세정보 조회
    public ChatRoom getRoomInfo(Long roomSeq){
        return em.find(ChatRoom.class, roomSeq);
    }
}
