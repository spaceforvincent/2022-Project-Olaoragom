package com.example.climbingBear.domain.record.service;

import com.example.climbingBear.domain.record.dto.DiaryListResDto;
import com.example.climbingBear.domain.record.dto.RankByAllResDto;
import com.example.climbingBear.domain.record.dto.RankByMonthReqDto;
import com.example.climbingBear.domain.record.dto.RankByMonthResDto;
import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.record.repository.RecordRepository;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ChallengeService {
    private final RecordRepository recordRepository;
    private final UserRepository userRepository;

    // 월별 거리 순위
    public List<RankByMonthResDto> getMonthRank (Integer year, Integer month) throws Exception {
        List<User> users = userRepository.findAll();
        Map<String, Double> dic = new HashMap<>();

        // 반복문을 통해 사용자별 월별 랭킹 List로 생성
        for (User u : users) {
            Double sum = 0.0;
            List<Record> records = recordRepository.findByUserAndYearAndMonth(u, year, month);
            for (Record r : records) {
                if (r.isComplete() == false){
                    continue;
                }
                sum += r.getDistance();
            }
            if (sum != 0){
                dic.put(u.getNickname(), sum);
            }
        }

        List<Map.Entry<String, Double>> entryList = new LinkedList<>(dic.entrySet());
        entryList.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));
        return entryList.stream().map(RankByMonthResDto::new).collect(Collectors.toList());
    }

    // 누적 거리 순위
    public List<RankByAllResDto> getAllRank () throws Exception {
        List<User> users = userRepository.findAll();
        Map<String, Double> dic = new HashMap<>();

        for (User u : users) {
            Double sum = 0.0;
            List<Record> records = recordRepository.findByUser(u);
            for (Record r : records) {
                if (r.isComplete() == false){
                    break;
                }
                sum += r.getDistance();
            }
            if (sum != 0){
                dic.put(u.getNickname(), sum);
            }
        }

        List<Map.Entry<String, Double>> entryList = new LinkedList<>(dic.entrySet());
        entryList.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));
        return entryList.stream().map(RankByAllResDto::new).collect(Collectors.toList());
    }
}
