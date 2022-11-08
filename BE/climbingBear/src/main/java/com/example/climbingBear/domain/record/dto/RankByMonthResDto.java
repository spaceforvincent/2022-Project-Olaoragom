package com.example.climbingBear.domain.record.dto;

import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import io.swagger.models.auth.In;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class RankByMonthResDto {
    private Long userSeq;
    private Double myDistance;



}
