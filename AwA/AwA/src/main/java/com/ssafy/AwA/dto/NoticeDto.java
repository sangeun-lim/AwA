package com.ssafy.AwA.dto;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@ToString
public class NoticeDto {

    private Long notice_id;

    private String title;

    private String content;

    private int viewCount;

    @Builder
    public NoticeDto(Long notice_id, String title, String content, int viewCount) {
        this.notice_id = notice_id;
        this.title = title;
        this.content = content;
        this.viewCount = viewCount;
    }
}
