package com.example.climbingBear.domain.user.dto;

import com.example.climbingBear.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResDto {
    public String accessToken;
    public String refreshToken;
    public String nickname;


}
