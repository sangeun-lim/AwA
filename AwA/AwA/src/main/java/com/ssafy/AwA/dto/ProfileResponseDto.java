package com.ssafy.AwA.dto;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
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

    private List<Profile> following_list;

    private List<Profile> follower_list;

    private List<Artwork> artwork_list;

    private List<Artwork> liked_artwork_list;


    @Builder

    public ProfileResponseDto(String nickname, String description, String picture_url, Long owner_user, List<String> favorite_field, List<Profile> following_list, List<Profile> follower_list,
                              List<Artwork> artwork_list, List<Artwork> liked_artwork_list) {
        this.nickname = nickname;
        this.description = description;
        this.picture_url = picture_url;
        this.owner_user = owner_user;
        this.favorite_field = favorite_field;
        this.following_list = following_list;
        this.follower_list = follower_list;
        this.artwork_list = artwork_list;
        this.liked_artwork_list = liked_artwork_list;
    }
}
