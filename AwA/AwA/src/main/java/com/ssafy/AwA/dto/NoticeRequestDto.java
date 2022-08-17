package com.ssafy.AwA.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
public class NoticeRequestDto {

    private String title;

    private String content;

    @Builder
    public NoticeRequestDto(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
