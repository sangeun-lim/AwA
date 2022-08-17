package com.ssafy.AwA.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class ProfileListDto {

    private String nickname;
    private String profile_picture_url;

    @Builder
    public ProfileListDto(String nickname, String profile_picture_url) {
        this.nickname = nickname;
        this.profile_picture_url = profile_picture_url;
    }
}
