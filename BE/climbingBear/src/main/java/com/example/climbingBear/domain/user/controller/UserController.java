package com.example.climbingBear.domain.user.controller;

import com.example.climbingBear.domain.user.dto.LoginReqDto;
import com.example.climbingBear.domain.user.dto.LoginResDto;
import com.example.climbingBear.domain.user.dto.SignupReqDto;
import com.example.climbingBear.domain.user.service.UserService;
import com.example.climbingBear.global.common.CommonResponse;
import com.example.climbingBear.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @GetMapping("/access-token")
    public ResponseEntity<CommonResponse> getAccessToken(HttpServletRequest request) {
        String refreshToken = (String) request.getAttribute("refreshToken");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.getAccessToken(refreshToken)), HttpStatus.OK);
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "id, pw, nickname 입력")
    public ResponseEntity<CommonResponse> signUpUser(@RequestBody SignupReqDto dto) throws IOException {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.signup(dto)), HttpStatus.OK);
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "id, pw 입력")
    public ResponseEntity<CommonResponse> login(@RequestBody LoginReqDto dto) throws IOException {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.login(dto)), HttpStatus.OK);
    }

    @GetMapping("/nickname/{nickName}")
    @ApiOperation(value = "닉네임 중복 확인", notes = "닉네임 입력")
    public ResponseEntity<?> checkNickname(@PathVariable("nickName") String nickName) throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.checkNickname(nickName)), HttpStatus.OK);
    }

    @GetMapping("/email/{id}")
    @ApiOperation(value = "이메일 중복 확인", notes = "닉네임 입력")
    public ResponseEntity<?> checkEmail(@PathVariable("id") String id) throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.checkId(id)), HttpStatus.OK);
    }

    @GetMapping("/lists")
    @ApiOperation(value = "사용자 리스트", notes = "등산 메이트 검색을 위한 사용자 리스트")
    public ResponseEntity<?> getUserList(@RequestParam("id") String id)throws Exception {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.findAllUser(id)), HttpStatus.OK);
    }
}
