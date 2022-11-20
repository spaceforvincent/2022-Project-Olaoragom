package com.example.climbingBear.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetAccessTokenResponseDto {

    private String accessToken;
}
