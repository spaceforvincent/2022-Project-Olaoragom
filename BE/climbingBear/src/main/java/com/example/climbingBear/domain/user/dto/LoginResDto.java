package com.example.climbingBear.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResDto {
    public String accessToken;
    public String refreshToken;
}
