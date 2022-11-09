package com.example.climbingBear.domain.chat.repository;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatRoom, Long> {
}
