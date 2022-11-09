package com.example.climbingBear.domain.chat.exception;

public class NoExistChatRoomException extends RuntimeException{
    public NoExistChatRoomException() {
        super("존재하지 않는 채팅방 입니다.");
    }
}
