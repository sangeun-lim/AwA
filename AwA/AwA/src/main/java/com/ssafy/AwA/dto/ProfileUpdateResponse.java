package com.ssafy.AwA.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class ProfileUpdateResponse {
    private String nickname;
    private String description;
    private String picture_url;
    private List<String> favorite_field;

    @Builder

    public ProfileUpdateResponse(String nickname, String description,
                                 String picture_url, List<String> favorite_field) {
        this.nickname = nickname;
        this.description = description;
        this.picture_url = picture_url;
        this.favorite_field = favorite_field;
    }
}
