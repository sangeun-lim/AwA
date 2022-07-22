package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
public class UserApiController {
    private final UserService userService;

    @Data
    static class CreateUserResponse {
        private Long user_id;

        public CreateUserResponse(Long user_id)
        {
            this.user_id = user_id;
        }
    }

    @PostMapping("/auth/signup")
    public CreateUserResponse saveMemberV1(@RequestBody @Valid User user) {
        Long user_id = userService.join(user);
        return new CreateUserResponse(user_id);
    }


}
