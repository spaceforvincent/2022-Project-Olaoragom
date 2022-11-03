package com.example.climbingBear.domain.mntn.repository;

import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.mntn.entity.MountainPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MntnPlaceRepository extends JpaRepository<MountainPlace, Long> {
    List<MountainPlace> findByMntn(Mountain mntn);
}
