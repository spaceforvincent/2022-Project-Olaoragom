package com.example.climbingBear.domain.record.service;

import com.example.climbingBear.domain.diary.dto.DiaryListResDto;
import com.example.climbingBear.domain.diary.repository.DiaryRepository;
import com.example.climbingBear.domain.mntn.entity.Mountain;
import com.example.climbingBear.domain.mntn.exception.NoExistMntnException;
import com.example.climbingBear.domain.mntn.repository.MntnRepository;
import com.example.climbingBear.domain.record.dto.RecordListResDto;
import com.example.climbingBear.domain.record.dto.RecordPostReqDto;
import com.example.climbingBear.domain.record.dto.RecordPostResDto;
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
public class RecordService {

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final MntnRepository mntnRepository;

    public RecordPostResDto recordSave(RecordPostReqDto dto, Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        Mountain mntn = mntnRepository.findByMntnSeq(dto.getMntnSeq()).orElseThrow(() ->
                new NoExistMntnException());
        Record record = dto.toRecordEntity(user, mntn);
        recordRepository.save(record);
        return RecordPostResDto.of(record.getRecordSeq());
    }

    public List<RecordListResDto> MyRecordList(Long userSeq) throws Exception {
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(() ->
                new NoExistUserException());
        List<Record> records = recordRepository.findByUser(user);
        return records.stream().map(RecordListResDto::new).collect(Collectors.toList());

    }
}
