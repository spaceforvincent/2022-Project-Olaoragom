package com.example.climbingBear.domain.record.dto;

import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.repository.UserRepository;
import com.example.climbingBear.domain.user.service.UserService;
import com.example.climbingBear.global.jwt.JwtProvider;
import lombok.Data;

import javax.naming.ldap.PagedResultsControl;
import java.util.List;
import java.util.Map;

@Data
public class RankByAllResDto {
//    private Long userSeq;
    private String nickname;
    private double distance;

    public RankByAllResDto(Map.Entry<String, Double> longDoubleEntry) {
        this.nickname = longDoubleEntry.getKey();
        this.distance = longDoubleEntry.getValue();

    }
}
