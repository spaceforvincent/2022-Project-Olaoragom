package com.example.climbingBear.domain.board;

import com.example.climbingBear.domain.record.dto.DiaryListResDto;
import com.example.climbingBear.domain.record.dto.DiaryPostResDto;
import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import com.example.climbingBear.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public BoardPostResDto saveBoard (BoardPostReqDto dto, Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        Board board = dto.create(user);
        boardRepository.save(board);

        return BoardPostResDto.of(board.getBoardSeq());
    }

    public List<BoardListResDto> myBoardList (Long userSeq){
        System.out.println("userSeq :" + userSeq);
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        List<Board> boards = boardRepository.findAll();
        return boards.stream().map(BoardListResDto::new).collect(Collectors.toList());
    }
}
