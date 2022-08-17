package com.ssafy.AwA.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class NoticePageDto {

    private long totalCount;
    private List<NoticeDto> noticeDtoList;

    @Builder
    public NoticePageDto(long totalCount, List<NoticeDto> noticeDtoList) {
        this.totalCount = totalCount;
        this.noticeDtoList = noticeDtoList;
    }
}
