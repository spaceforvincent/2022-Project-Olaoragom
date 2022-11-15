package com.example.climbingBear.domain.chat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {
    @RequestMapping("/room")
    public String rooms() {
        return "room";
    }

    @RequestMapping("/roomdetail")
    public String roomdetail() {
        return "roomdetail";
    }
}
