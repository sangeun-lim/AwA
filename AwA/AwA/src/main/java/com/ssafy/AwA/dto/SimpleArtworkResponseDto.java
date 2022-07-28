package com.ssafy.AwA.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SimpleArtworkResponseDto {

    private String firstAttachmentURL;
    private String title;
    private String nickname;
    private int price;
}
