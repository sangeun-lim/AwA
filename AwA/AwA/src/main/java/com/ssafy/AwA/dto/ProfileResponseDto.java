package com.ssafy.AwA.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProfileResponseDto {

    private String nickname;
    private String description;
    private String picture_url;
}
