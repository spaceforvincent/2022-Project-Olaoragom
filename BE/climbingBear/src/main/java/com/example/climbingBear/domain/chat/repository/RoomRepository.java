package com.example.climbingBear.domain.chat.repository;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByRoomSeq(Long roomSeq);

}
