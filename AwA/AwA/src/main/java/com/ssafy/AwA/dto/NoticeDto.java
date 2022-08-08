package com.ssafy.AwA.dto;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
public class NoticeDto {

    private Long notice_id;

    private String title;

    private String content;

    private int viewCount;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    @Builder
    public NoticeDto(Long notice_id, String title, String content, int viewCount, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.notice_id = notice_id;
        this.title = title;
        this.content = content;
        this.viewCount = viewCount;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }
}
