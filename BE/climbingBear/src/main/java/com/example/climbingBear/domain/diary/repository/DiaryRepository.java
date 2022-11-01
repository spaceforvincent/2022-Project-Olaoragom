package com.example.climbingBear.domain.diary.repository;

import com.example.climbingBear.domain.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

}
