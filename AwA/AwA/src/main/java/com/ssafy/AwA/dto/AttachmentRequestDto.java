package com.ssafy.AwA.dto;

import lombok.*;

import javax.persistence.Column;

@Data
@NoArgsConstructor
@ToString
public class AttachmentRequestDto {

    private String type;

    private String url;

    @Builder
    public AttachmentRequestDto( String type, String url) {

        this.type = type;
        this.url = url;
    }
}
