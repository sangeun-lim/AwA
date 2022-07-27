package com.ssafy.AwA.dto;

import lombok.*;

@Data
@NoArgsConstructor
@ToString
public class ProfileDto {

    private String profilePictureURL;
    private String description;
    private String nickname;

    @Builder
    public ProfileDto(String profilePictureURL, String description, String nickname) {
        this.profilePictureURL = profilePictureURL;
        this.description = description;
        this.nickname = nickname;
    }
}
