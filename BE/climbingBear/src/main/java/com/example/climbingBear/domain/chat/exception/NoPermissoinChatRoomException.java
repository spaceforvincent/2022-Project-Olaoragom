package com.example.climbingBear.domain.chat.exception;

public class NoPermissoinChatRoomException extends RuntimeException{
    public NoPermissoinChatRoomException () {
        super("채팅 방 운영에 권한이 없습니다.");
    }
}
