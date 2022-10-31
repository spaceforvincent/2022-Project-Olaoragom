package com.example.climbingBear.domain.mntn.repository;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MntnRepository extends JpaRepository<Mountain, Long> {
    Optional<Mountain> findByMntnSeq(Long mntnSeq);

}
