package com.example.climbingBear.domain.record.Exception;

public class NoRecordException extends RuntimeException{
    public NoRecordException() {
        super("존재하지 않는 등산 기록입니다.");
    }
}
