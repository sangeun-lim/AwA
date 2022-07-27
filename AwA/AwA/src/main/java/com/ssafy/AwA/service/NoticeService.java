package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.notice.Notice;
import com.ssafy.AwA.dto.NoticeDto;
import com.ssafy.AwA.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<Notice> getNoticeList() {
        return noticeRepository.findAll();
    }
    public Notice saveNotice(NoticeDto noticeDto)
    {
        Notice newNotice = Notice.builder()
                .title(noticeDto.getTitle())
                .content(noticeDto.getContent())
                .build();

        return noticeRepository.save(newNotice);
    }

    public Notice getNotice(Long noticeId) {
        Notice findNoticeByNoticeId =  noticeRepository.findByNotice_id(noticeId);
        findNoticeByNoticeId.addViewCount();
        return findNoticeByNoticeId;
    }

    public Notice updateNotice(Long noticeId, NoticeDto noticeDto) {
        Notice targetNotice = noticeRepository.findByNotice_id(noticeId);

        targetNotice.updateTitle(noticeDto.getTitle());
        targetNotice.updateContent(noticeDto.getContent());

        return targetNotice;
    }

    //정확하지 않은 id삭제 요청에 대한 처리 필요할까??
    public int deleteNotice(Long noticeId) {
        Notice targetNotice = noticeRepository.findByNotice_id(noticeId);
        noticeRepository.delete(targetNotice);
        return 1;
    }
}
