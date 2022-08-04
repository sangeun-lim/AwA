package com.ssafy.AwA.dto;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class ProfileArtworkResponse {
    private Long artwork_id;
    private String title;
    private String picture_url;
    private List<String> genre;
    @CreatedDate
    private LocalDateTime createdDate;

    @Builder
    public ProfileArtworkResponse(Long artwork_id, String title, String picture_url, List<String> genre, LocalDateTime createdDate) {
        this.artwork_id = artwork_id;
        this.title = title;
        this.picture_url = picture_url;
        this.genre = genre;
        this.createdDate = createdDate;
    }
}
