package com.ssafy.AwA.controller;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@Getter
public class UserForm {

    @NotEmpty(message = "이메일은 필수입니다.")
    private String email;

    @NotEmpty(message = "비밀번호는 필수입니다.")
    private String password;

    @NotEmpty(message = "닉네임 필수입니다.")
    private String nickname;
    private int gender;
    private LocalDate birth_date;
    private boolean is_manager;
    private String description;
}
