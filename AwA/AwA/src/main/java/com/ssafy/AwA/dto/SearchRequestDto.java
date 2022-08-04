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
    List<Integer> price;
    int status;

    @Builder
    public SearchRequestDto(List<String> genre, List<Integer> price, int status) {
        this.genre = genre;
        this.price = price;
        this.status = status;
    }
}
