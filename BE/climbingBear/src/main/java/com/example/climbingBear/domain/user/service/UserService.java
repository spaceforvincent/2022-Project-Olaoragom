package com.example.climbingBear.domain.user.service;


import com.example.climbingBear.domain.user.dto.*;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import com.example.climbingBear.domain.user.repository.UserRepository;
import com.example.climbingBear.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public SignupResDto signup (SignupReqDto dto){
        User user = dto.toUserEntity();
        String accessToken = jwtProvider.getAccessToken(user.getId());
        String refreshToken = jwtProvider.getRefreshToken();
        user.updateRefreshToken(refreshToken);
        userRepository.save(user);
        return SignupResDto.of(accessToken, refreshToken);
    }

    public GetAccessTokenResponseDto getAccessToken(String refreshToken) {
        User user = userRepository.findByRefreshToken(refreshToken).orElseThrow(() ->
                new NoExistUserException());
        return new GetAccessTokenResponseDto(jwtProvider.getAccessToken(user.getId()));
    }

    public LoginResDto login(LoginReqDto dto){
        User user = userRepository.findByIdAndPw(dto.getId(), dto.getPw()).orElseThrow(() ->
                new NoExistUserException());
        return new LoginResDto(jwtProvider.getAccessToken(user.getId()), jwtProvider.getRefreshToken());
    }
}
