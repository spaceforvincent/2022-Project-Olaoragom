package com.example.climbingBear.domain.diary.service;

import com.example.climbingBear.domain.diary.dto.*;
import com.example.climbingBear.domain.diary.entity.Diary;
import com.example.climbingBear.domain.diary.exception.NoExistDiaryException;
import com.example.climbingBear.domain.mntn.exception.NoExistMntnException;
import com.example.climbingBear.domain.diary.exception.NoPermissionDeleteDiaryException;
import com.example.climbingBear.domain.diary.exception.NoPermissionUpdateDiaryException;
import com.example.climbingBear.domain.diary.repository.DiaryRepository;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.mntn.repository.MntnRepository;
import com.example.climbingBear.domain.user.entity.User;
import com.example.climbingBear.domain.user.exception.NoExistUserException;
import com.example.climbingBear.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;
    private final MntnRepository mntnRepository;

    public List<DiaryListResDto> myDiarylist (Long userSeq){
        System.out.println("userSeq :" + userSeq);
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        List<Diary> diaries = diaryRepository.findByUser(user);
        return diaries.stream().map(DiaryListResDto::new).collect(Collectors.toList());
    }
    public DiaryPostResDto diarySave (DiaryPostReqDto dto, Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        Mountain mntn = mntnRepository.findByMntnSeq(dto.getMntnSeq()).orElseThrow(() ->
                new NoExistMntnException());
        Diary diary = dto.toDiaryEntity(user, mntn);
        diaryRepository.save(diary);
        return DiaryPostResDto.of(diary.getDiarySeq());
    }
    public DiaryUpdateResDto diaryUpdate (DiaryUpdateReqDto dto, Long userSeq)throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        Mountain mntn = mntnRepository.findByMntnSeq(dto.getMntnSeq()).orElseThrow(() ->
                new NoExistMntnException());
        Diary diary = diaryRepository.findByDiarySeq(dto.getDiarySeq()).orElseThrow(() ->
                new NoExistDiaryException());
        if (user.getUserSeq() == diary.getUser().getUserSeq()){
            diary.update(mntn, dto.getYear(), dto.getMonth(), dto.getDay());
            return DiaryUpdateResDto.of(diary.getDiarySeq());
        }else {
            throw new NoPermissionUpdateDiaryException();
        }
    }

    public void diaryDelete(Long userSeq, Long diarySeq)throws Exception{
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        Diary diary = diaryRepository.findByDiarySeq(diarySeq).orElseThrow(() ->
                new NoExistDiaryException());
        if (user.getUserSeq() == diary.getUser().getUserSeq()){
            diaryRepository.delete(diary);
        }else {
            throw new NoPermissionDeleteDiaryException();
        }
    }

}
