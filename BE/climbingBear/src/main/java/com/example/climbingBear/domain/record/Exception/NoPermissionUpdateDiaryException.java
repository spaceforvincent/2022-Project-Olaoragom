package com.example.climbingBear.domain.record.Exception;

public class NoPermissionUpdateDiaryException extends RuntimeException{
    public NoPermissionUpdateDiaryException() {
        super("등산 일정 수정 권한이 없습니다.");
    }
}
