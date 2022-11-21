package com.example.climbingBear.domain.mntn.exception;

public class NoExistFeatureException extends RuntimeException{
    public NoExistFeatureException() {
        super("존재하지 않는 feature입니다.");
    }
}
