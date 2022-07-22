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

    @Data
    static class CreateUserRequest {
        @NotEmpty
        private String email;
        @NotEmpty
        private String password;
        @NotEmpty
        private String nickname;
        private int gender;
        private int age;
        private boolean is_manager;
        private String description;
    }

    //엔티티를 파라미터로 받지말라 !!!!!!!!!!!!!!!!!
//    @PostMapping("/auth/signup")
//    public CreateUserResponse saveMemberV1(@RequestBody @Valid User user) {
//        Long user_id = userService.join(user);
//        return new CreateUserResponse(user_id);
//    }

    @PostMapping("/auth/signup")
    public CreateUserResponse saveUser(@RequestBody @Valid CreateUserRequest request)
    {
        User user = User.builder()
                .password(request.getPassword())
                .age(request.getAge())
                .description(request.getDescription())
                .email(request.getEmail())
                .gender(request.getGender())
                .is_manager(request.is_manager)
                .nickname(request.getNickname())
                .build();
        userService.join(user);
        return new CreateUserResponse(user.getUser_id());
    }



}
