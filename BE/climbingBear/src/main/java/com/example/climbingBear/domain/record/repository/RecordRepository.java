package com.example.climbingBear.domain.record.repository;

import com.example.climbingBear.domain.record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {

}
