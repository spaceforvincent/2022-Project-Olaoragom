package com.example.climbingBear.domain.user.dto;

import com.example.climbingBear.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Builder
@AllArgsConstructor
public class UserListResDto {
    private Long userSeq;
    private String nickname;

    public UserListResDto(User user){
        this.nickname = user.getNickname();
        this.userSeq = user.getUserSeq();
    }
}
