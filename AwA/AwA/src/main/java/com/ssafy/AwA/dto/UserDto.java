package com.ssafy.AwA.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
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

    private boolean is_manager;

    private boolean is_seller;

    @Builder
    public UserDto(Long user_id, String email, String nickname, boolean gender, LocalDate birth, boolean is_manager, boolean is_seller) {
        this.user_id = user_id;
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.birth = birth;
        this.is_manager = is_manager;
        this.is_seller = is_seller;
    }
}
