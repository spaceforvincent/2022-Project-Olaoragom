package com.example.climbingBear.domain.record.dto;

import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import com.example.climbingBear.domain.user.repository.UserRepository;
import io.swagger.models.auth.In;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Data
public class RankByMonthResDto {
//    private Long userSeq;
    private String nickname;
    private double distance;



    public RankByMonthResDto (Map.Entry<String, Double> longDoubleEntry) {
        this.nickname = longDoubleEntry.getKey();
        this.distance = longDoubleEntry.getValue();

    }


}
