package com.example.climbingBear.domain.user.exception;

public class ExistSameIdException extends RuntimeException{
    public ExistSameIdException() {
        super("존재하는 ID입니다.");
    }
}
