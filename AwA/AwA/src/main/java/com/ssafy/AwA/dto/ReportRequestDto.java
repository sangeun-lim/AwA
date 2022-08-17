package com.ssafy.AwA.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class ReportRequestDto {
    private String category;

    private String content;

    private Long reported_artwork_id;

    private String report_profile_nickname;

    @Builder
    public ReportRequestDto(String category, String content, Long reported_artwork_id, String report_profile_nickname) {
        this.category = category;
        this.content = content;
        this.reported_artwork_id = reported_artwork_id;
        this.report_profile_nickname = report_profile_nickname;
    }
}
