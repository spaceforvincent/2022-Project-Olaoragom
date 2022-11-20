package com.example.climbingBear.domain.board;

import com.example.climbingBear.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Board {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardSeq;

    private String title;

    private String content;

    @ManyToOne
    private User user;

    @Builder
    public Board (String title, String content, User user) {
        this.title = title;
        this.user = user;
        this.content = content;
    }
}
