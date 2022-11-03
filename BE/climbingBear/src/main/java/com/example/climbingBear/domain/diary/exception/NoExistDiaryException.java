package com.example.climbingBear.domain.diary.exception;

public class NoExistDiaryException extends RuntimeException{
    public NoExistDiaryException() {
        super("존재하지 않는 등산 계획입니다.");
    }
}
