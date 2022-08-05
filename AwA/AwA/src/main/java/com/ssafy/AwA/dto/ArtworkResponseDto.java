package com.ssafy.AwA.dto;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.attachment.Attachment;
import com.ssafy.AwA.domain.comment.Comment;
import com.ssafy.AwA.domain.user.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class ArtworkResponseDto implements Comparable<ArtworkResponseDto> {

    private Long artwork_id;

    @CreatedDate
    private LocalDateTime createdDate;

    private String profile_picture;
    private String sell_user_nickname;
    private String sell_user_email;

    private String title;

    private int price;

    private List<AttachmentRequestDto> attachmentRequestDtoList;

    private String description;

    private List<String> genre;

    private String ingredient;

    private int like_count;
    private int view_count;

    private boolean is_sell;

    private List<CommentResponseDto> comments;

    @Builder

    public ArtworkResponseDto(Long artwork_id, LocalDateTime createdDate, String profile_picture, String sell_user_nickname, String sell_user_email, String title, int price, List<AttachmentRequestDto> attachmentRequestDtoList,
                              String description, List<String> genre, String ingredient, int like_count, int view_count, List<CommentResponseDto> comments, boolean is_sell) {
        this.artwork_id = artwork_id;
        this.createdDate = createdDate;
        this.profile_picture = profile_picture;
        this.sell_user_nickname = sell_user_nickname;
        this.sell_user_email = sell_user_email;
        this.title = title;
        this.price = price;
        this.attachmentRequestDtoList = attachmentRequestDtoList;
        this.description = description;
        this.genre = genre;
        this.ingredient = ingredient;
        this.like_count = like_count;
        this.view_count = view_count;
        this.comments = comments;
        this.is_sell = is_sell;
    }

    @Override
    public int compareTo(ArtworkResponseDto o) {
        if(o.artwork_id < artwork_id) {
            return 1;
        } else {
            return -1;
        }
    }
}
