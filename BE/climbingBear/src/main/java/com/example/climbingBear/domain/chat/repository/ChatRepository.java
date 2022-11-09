package com.example.climbingBear.domain.chat.repository;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findByChatRoomSeq(Long chatRoomSeq);
}
