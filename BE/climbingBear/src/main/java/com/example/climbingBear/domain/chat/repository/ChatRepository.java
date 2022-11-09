package com.example.climbingBear.domain.chat.repository;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findByChatRoomSeq(Long chatRoomSeq);


}
