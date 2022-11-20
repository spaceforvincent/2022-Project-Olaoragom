package com.example.climbingBear.domain.board;

import com.example.climbingBear.domain.chat.entity.ChatRoom;
import com.example.climbingBear.domain.user.entity.User;
import lombok.Data;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.UUID;

@Data
public class BoardPostReqDto {
    private String title;
    private String content;

    public Board create(User user) {
        return Board.builder()
                .title(this.title)
                .content(this.content)
                .user(user)
                .build();

    }

}
