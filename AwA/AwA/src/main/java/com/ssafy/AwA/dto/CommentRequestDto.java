package com.ssafy.AwA.dto;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class CommentRequestDto {
    private Long parent_artwork_id;

    private String nickname;

    private String content;

    @Builder
    public CommentRequestDto(Long parent_artwork_id, String nickname, String content) {
        this.parent_artwork_id = parent_artwork_id;
        this.nickname = nickname;
        this.content = content;
    }
}
