package com.ssafy.AwA.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class SearchRequestDto {

    List<String> genre;
    int genre_count;
    int min_price;
    int max_price;
    int status;

    @Builder
    public SearchRequestDto(List<String> genre, int genre_count, int min_price, int max_price, int status) {
        this.genre = genre;
        this.genre_count = genre_count;
        this.min_price = min_price;
        this.max_price = max_price;
        this.status = status;
    }
}
