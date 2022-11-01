package com.example.climbingBear.domain.diary.service;

import com.example.climbingBear.domain.diary.dto.DiaryPostReqDto;
import com.example.climbingBear.domain.diary.dto.DiaryPostResDto;
import com.example.climbingBear.domain.diary.entity.Diary;
import com.example.climbingBear.domain.diary.exception.NoExistMntnException;
import com.example.climbingBear.domain.diary.repository.DiaryRepository;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.mntn.repository.MntnRepository;
import com.example.climbingBear.domain.user.dto.SignupReqDto;
import com.example.climbingBear.domain.user.dto.SignupResDto;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import com.example.climbingBear.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;
    private final MntnRepository mntnRepository;

    public DiaryPostResDto diarySave (DiaryPostReqDto dto, String id) throws Exception {
        User user = userRepository.findById(id).orElseThrow(() ->
                new NoExistUserException());
        Mountain mntn = mntnRepository.findByMntnSeq(dto.getMntnSeq()).orElseThrow(() ->
                new NoExistMntnException());
        Diary diary = dto.toDiaryEntity(user, mntn);
        diaryRepository.save(diary);
        return DiaryPostResDto.of(diary.getDiarySeq());
    }


}
