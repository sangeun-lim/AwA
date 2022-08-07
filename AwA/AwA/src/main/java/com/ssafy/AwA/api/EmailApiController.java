package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.EmailRequest;
import com.ssafy.AwA.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/email")
public class EmailApiController {

    private final EmailService emailService;
    @PostMapping
    public int authEmail(@RequestBody @Valid EmailRequest emailRequest) {
        try {
            return emailService.sendMail(emailRequest);
        } catch (Exception e)
        {
            return 0;
        }
    }
}
