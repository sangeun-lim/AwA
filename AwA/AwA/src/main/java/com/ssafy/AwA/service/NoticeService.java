package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.notice.Notice;
import com.ssafy.AwA.dto.ArtworkResponseDto;
import com.ssafy.AwA.dto.NoticeDto;
import com.ssafy.AwA.dto.NoticePageDto;
import com.ssafy.AwA.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<Notice> getNoticeList() {
        return noticeRepository.findAllOrderBy();
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

    public NoticePageDto getNoticeByPageNo(int pageNo) {
        PageRequest page = PageRequest.of(pageNo-1, 10, Sort.by(Sort.Direction.DESC, "notice_id"));
        Page<Notice> allNoticesPage = noticeRepository.findAll(page);

        List<Notice> allNotices = allNoticesPage.getContent();
        System.out.println(allNoticesPage.getTotalElements() + "총 개수");

        List<NoticeDto> noticeDtoList = new ArrayList<>();

        for(int i=0;i<allNotices.size();i++) {
            Notice notice = allNotices.get(i);
            NoticeDto noticeDto = NoticeDto.builder()
                    .notice_id(notice.getNotice_id())
                    .content(notice.getContent())
                    .title(notice.getTitle())
                    .viewCount(notice.getViewCount())
                    .build();

            noticeDtoList.add(noticeDto);
        }

        return NoticePageDto.builder()
                .noticeDtoList(noticeDtoList)
                .totalCount(allNoticesPage.getTotalElements())
                .build();
    }
}
