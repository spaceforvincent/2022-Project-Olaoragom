package com.example.climbingBear.domain.user.Repository;

import com.example.climbingBear.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(String id);
    Optional<User> findByUserSeq(Long userSeq);
    Optional<User> findByRefreshToken(String refreshToken);

    Optional<User> findByIdAndPw(String id, String pw);
}
