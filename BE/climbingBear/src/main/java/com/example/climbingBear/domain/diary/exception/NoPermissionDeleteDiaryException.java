package com.example.climbingBear.domain.diary.exception;

public class NoPermissionDeleteDiaryException extends RuntimeException{
    public NoPermissionDeleteDiaryException(){
        super("등산 계획 삭제 권한이 없습니다.");
    }
}
