package com.ssafy.AwA.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class ProfileResponseDto {

    private String nickname;
    private String description;
    private String picture_url;
    private Long owner_user;
    private List<String> favorite_field;

    @Builder
    public ProfileResponseDto(String nickname, String description, String picture_url, Long owner_user, List<String> favorite_field) {
        this.nickname = nickname;
        this.description = description;
        this.picture_url = picture_url;
        this.owner_user = owner_user;
        this.favorite_field = favorite_field;
    }
}
