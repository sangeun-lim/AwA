package com.ssafy.AwA.dto;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
public class CommentResponseDto extends BaseTimeEntity {

    private Long comment_id;

    private Long parent_artwork_id;

    private String nickname;

    private String content;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    @Builder
    public CommentResponseDto(Long comment_id, Long parent_artwork_id, String nickname, String content, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.comment_id = comment_id;
        this.parent_artwork_id = parent_artwork_id;
        this.nickname = nickname;
        this.content = content;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

}
