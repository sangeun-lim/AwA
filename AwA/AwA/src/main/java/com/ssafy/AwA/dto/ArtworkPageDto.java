package com.ssafy.AwA.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class ArtworkPageDto {
    private long totalCount;
    private List<ArtworkResponseDto> artworkResponseDto;
    @Builder

    public ArtworkPageDto(long totalCount, List<ArtworkResponseDto> artworkResponseDto) {
        this.totalCount = totalCount;
        this.artworkResponseDto = artworkResponseDto;
    }
}
