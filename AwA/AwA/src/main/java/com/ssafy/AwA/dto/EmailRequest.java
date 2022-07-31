package com.ssafy.AwA.dto;

import lombok.*;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
@ToString
public class EmailRequest {

    @Email
    private String email;

    @Builder
    public EmailRequest(String email) {
        this.email = email;
    }
}
