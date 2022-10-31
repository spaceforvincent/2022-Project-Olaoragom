package com.example.climbingBear.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.omg.CORBA.PUBLIC_MEMBER;

@Data
@AllArgsConstructor
public class LoginResDto {
    public String accessToken;
    public String refreshToken;
}
