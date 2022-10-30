package com.example.climbingBear.domain.user.dto;

import com.example.climbingBear.domain.user.entity.User;
import lombok.Data;

@Data
public class SignupReqDto {

    private String id;

    private String pw;

    private String nickname;

    public User toUserEntity(){
        return User.builder()
                .id(this.id)
                .pw(this.pw)
                .nickname(this.nickname)
                .build();
    }
}
