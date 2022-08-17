package com.ssafy.AwA.dto;

import lombok.*;

@Data
@NoArgsConstructor
@ToString
public class ProfileRankResponseDto {

    private String email;
    private String nickname;
    private String profile_picture_url;

    @Builder
    public ProfileRankResponseDto(String email, String nickname, String profile_picture_url) {
        this.email = email;
        this.nickname = nickname;
        this.profile_picture_url = profile_picture_url;
    }
}
