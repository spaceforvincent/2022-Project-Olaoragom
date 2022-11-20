package com.example.climbingBear.domain.record.service;

import com.example.climbingBear.domain.record.Exception.NoExistDiaryException;
import com.example.climbingBear.domain.mntn.exception.NoExistMntnException;
import com.example.climbingBear.domain.record.Exception.NoPermissionDeleteDiaryException;
import com.example.climbingBear.domain.record.Exception.NoPermissionUpdateDiaryException;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.mntn.repository.MntnRepository;
import com.example.climbingBear.domain.record.dto.*;
import com.example.climbingBear.domain.record.entity.Record;
import com.example.climbingBear.domain.record.repository.RecordRepository;
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
    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final MntnRepository mntnRepository;

    @Transactional
    public List<DiaryListResDto> myDiarylist (Long userSeq){
        System.out.println("userSeq :" + userSeq);
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        List<Record> diaries = recordRepository.findByUser(user);
        return diaries.stream().map(DiaryListResDto::new).collect(Collectors.toList());
    }
    public DiaryPostResDto diarySave (DiaryPostReqDto dto, Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        Mountain mntn = mntnRepository.findByMntnSeq(dto.getMntnSeq()).orElseThrow(() ->
                new NoExistMntnException());
        Record record = dto.toDiaryEntity(user, mntn);
        recordRepository.save(record);
        return DiaryPostResDto.of(record.getRecordSeq());
    }
    public DiaryUpdateResDto diaryUpdate (DiaryUpdateReqDto dto, Long userSeq)throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        Mountain mntn = mntnRepository.findByMntnSeq(dto.getMntnSeq()).orElseThrow(() ->
                new NoExistMntnException());
        Record record = recordRepository.findByRecordSeq(dto.getRecordSeq()).orElseThrow(() ->
                new NoExistDiaryException());
        if (user.getUserSeq() == record.getUser().getUserSeq()){
            record.update(mntn, dto.getYear(), dto.getMonth(), dto.getDay());
            return DiaryUpdateResDto.of(record.getRecordSeq());
        }else {
            throw new NoPermissionUpdateDiaryException();
        }
    }

    public void diaryDelete(Long userSeq, Long recordSeq)throws Exception{
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        Record record = recordRepository.findByRecordSeq(recordSeq).orElseThrow(() ->
                new NoExistDiaryException());
        if (user.getUserSeq() == record.getUser().getUserSeq()){
            recordRepository.delete(record);
        }else {
            throw new NoPermissionDeleteDiaryException();
        }
    }

}
