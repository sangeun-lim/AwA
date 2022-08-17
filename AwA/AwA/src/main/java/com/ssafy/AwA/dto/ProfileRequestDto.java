package com.ssafy.AwA.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class ProfileRequestDto {

    private String profile_picture_url;

    private String nickname;

    private String description;

    List<String> favorite_field = new ArrayList<>();

    @Builder

    public ProfileRequestDto(String profile_picture_url, String nickname,
                             String description, List<String> favorite_field) {
        this.profile_picture_url = profile_picture_url;
        this.nickname = nickname;
        this.description = description;
        this.favorite_field = favorite_field;
    }
}
