package com.example.climbingBear.domain.mntn.repository;

import com.example.climbingBear.domain.mntn.entity.Feature;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long> {
    List<Feature> findByMntn(Mountain mntn);
    Optional<Feature> findFeatureByMntn(Mountain mntn);
}
