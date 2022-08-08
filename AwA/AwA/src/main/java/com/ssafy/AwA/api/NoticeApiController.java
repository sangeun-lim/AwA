package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.notice.Notice;
import com.ssafy.AwA.dto.NoticeDto;
import com.ssafy.AwA.dto.NoticePageDto;
import com.ssafy.AwA.dto.NoticeRequestDto;
import com.ssafy.AwA.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeApiController {

    private final NoticeService noticeService;

    @GetMapping("/page/{pageNo}")
    public NoticePageDto getNotciesByPageNo(@PathVariable("pageNo") int pageNo)
    {
        return noticeService.getNoticeByPageNo(pageNo);
    }
    @GetMapping("/list")
    public List<Notice> getNoticeList() {
        return noticeService.getNoticeList();
    }
    @PostMapping
    public Notice saveNotice(@RequestBody @Valid NoticeRequestDto noticeDto,@RequestHeader(value="X-AUTH-TOKEN") String token, @RequestHeader(value="RefreshToken") String refreshToken)
    {
        return noticeService.saveNotice(noticeDto);
    }

    @GetMapping("/{noticeId}")
    public Notice getNotice(@PathVariable("noticeId") Long noticeId)
    {
        return noticeService.getNotice(noticeId);
    }

    @PutMapping("/{noticeId}")
    public Notice updateNotice(@PathVariable("noticeId") Long noticeId, @RequestBody @Valid NoticeRequestDto noticeDto,@RequestHeader(value="X-AUTH-TOKEN") String token, @RequestHeader(value="RefreshToken") String refreshToken)
    {
        return noticeService.updateNotice(noticeId, noticeDto);
    }

    //정확하지 않은 id삭제 요청에 대한 처리 필요할까??
    @DeleteMapping("{noticeId}")
    public int deleteNotice(@PathVariable("noticeId") Long noticeId,@RequestHeader(value="X-AUTH-TOKEN") String token, @RequestHeader(value="RefreshToken") String refreshToken) {
        return noticeService.deleteNotice(noticeId);
    }
}
