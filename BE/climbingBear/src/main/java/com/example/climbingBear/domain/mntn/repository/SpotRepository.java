package com.example.climbingBear.domain.mntn.repository;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.mntn.entity.Spot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpotRepository extends JpaRepository<Spot, Long> {

    Optional<Spot> findByMntnNm(Mountain mntn);
}
