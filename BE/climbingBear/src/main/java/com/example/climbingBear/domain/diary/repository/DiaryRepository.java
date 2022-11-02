package com.example.climbingBear.domain.diary.repository;

import com.example.climbingBear.domain.diary.entity.Diary;
import com.example.climbingBear.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findByUser(User user);
}
