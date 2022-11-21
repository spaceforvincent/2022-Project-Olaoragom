package com.example.climbingBear.domain.user.exception;

public class ExistSameNickException extends RuntimeException{
    public ExistSameNickException() {
        super("존재하는 Nickname입니다.");
    }
}
