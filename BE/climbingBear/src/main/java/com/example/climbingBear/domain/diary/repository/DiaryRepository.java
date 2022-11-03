package com.example.climbingBear.domain.diary.repository;

import com.example.climbingBear.domain.diary.entity.Diary;
import com.example.climbingBear.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findByUser(User user);
    Optional<Diary> findByUserAndYearAndMonthAndDay(User user, Integer year, Integer month, Integer day);
    Optional<Diary> findByDiarySeq(Long diarySeq);
}
