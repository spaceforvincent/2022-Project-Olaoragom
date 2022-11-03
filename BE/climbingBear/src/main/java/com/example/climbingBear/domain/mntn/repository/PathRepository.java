package com.example.climbingBear.domain.mntn.repository;

import com.example.climbingBear.domain.mntn.entity.Feature;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.mntn.entity.Path;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PathRepository extends JpaRepository<Path, Long> {
    List<Path> findByFeature(Feature feature);
}
