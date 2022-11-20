package com.example.climbingBear.domain.board;

import lombok.Data;

@Data
public class BoardListResDto {
    private Long boardSeq;
    private String title;
    private String content;
    private Long userSeq;
    private String nickname;

    public BoardListResDto (Board board){
        this.title = board.getTitle();
        this.content = board.getContent();
        this.boardSeq = board.getBoardSeq();
        this.userSeq = board.getUser().getUserSeq();
        this.nickname = board.getUser().getNickname();
    }
}
