package com.example.climbingBear.domain.user.entity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class testController {
    @GetMapping("/home")
    public String home() {
        return "hello";
    }
}
