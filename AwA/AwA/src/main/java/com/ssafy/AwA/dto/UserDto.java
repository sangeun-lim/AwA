package com.ssafy.AwA.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@ToString
public class UserDto {
    private Long user_id;
    private String email;
    private String nickname;
    private boolean gender;

    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate birth;

    @Builder
    public UserDto(Long user_id, String email, String nickname, boolean gender, LocalDate birth) {
        this.user_id = user_id;
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.birth = birth;
    }
}
