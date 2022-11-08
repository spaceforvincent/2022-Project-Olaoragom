package com.example.climbingBear.domain.record.dto;

import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.repository.UserRepository;
import lombok.Data;

import javax.naming.ldap.PagedResultsControl;
import java.util.List;
import java.util.Map;

@Data
public class RankByAllResDto {
    private Long userSeq;
    private String nickname;
    private double distance;

    public RankByAllResDto(Map.Entry<Long, Double> longDoubleEntry) {
        this.userSeq = longDoubleEntry.getKey();
        this.distance = longDoubleEntry.getValue();
        this.nickname = getNickname();
    }
}
