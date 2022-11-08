package com.example.climbingBear.domain.record.repository;

import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Long> {

    List<Record> findByUser (User user);
    Optional<Record> findByRecordSeq(Long recordSeq);

    Optional<Record> findByUserAndYearAndMonthAndDay(User user, Integer year, Integer month, Integer day);
    boolean existsByUserAndYearAndMonthAndDay(User user, Integer year, Integer month, Integer day);
}
