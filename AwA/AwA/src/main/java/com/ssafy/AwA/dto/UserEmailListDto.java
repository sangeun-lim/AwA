package com.ssafy.AwA.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class UserEmailListDto {
    List<String> userEmailList;

    @Builder
    public UserEmailListDto(List<String> userEmailList) {
        this.userEmailList = userEmailList;
    }
}
