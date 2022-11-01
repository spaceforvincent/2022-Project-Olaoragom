package com.example.climbingBear.domain.diary.exception;

public class NoExistMntnException extends RuntimeException{
    public NoExistMntnException() {
        super("존재하지 않는 산입니다.");
    }
}
