package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.EmailRequest;
import com.ssafy.AwA.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/check/{userEmail}/{emailCode}")
    public int checkEmailCode(@PathVariable(name = "userEmail") String userEmail, @PathVariable(name = "emailCode") String emailCode)
    {
        return emailService.checkEmailCode(userEmail, emailCode);
    }

}
