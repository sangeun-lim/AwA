package com.ssafy.AwA.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class Favorite_fieldDto {
    List<String> favorite_field;

    @Builder
    public Favorite_fieldDto(List<String> favorite_field) {
        this.favorite_field = favorite_field;
    }
}
