package com.example.climbingBear.domain.user.controller;

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
    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "id, pw 입력")
    public ResponseEntity<CommonResponse> signUpUser(@RequestBody SignupReqDto dto) throws IOException {
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.signup(dto)), HttpStatus.OK);
    }

    @GetMapping("/access-token")
    public ResponseEntity<CommonResponse> getAccessToken(HttpServletRequest request){
        String refreshToken = (String) request.getAttribute("refreshToken");
        return new ResponseEntity<>(CommonResponse.getSuccessResponse(userService.getAccessToken(refreshToken)), HttpStatus.OK);
    }
}
