package com.example.climbingBear.domain.record.repository;

import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {

    List<Record> findByUser (User user);
}
