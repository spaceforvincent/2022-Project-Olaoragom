package com.example.climbingBear.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignupResDto {
    private String refreshToken;
    private String accessToken;

    public static SignupResDto of(String accessToken, String refreshToken){
        return SignupResDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
