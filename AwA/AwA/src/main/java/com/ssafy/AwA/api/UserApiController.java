package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserApiController {
    private final UserService userService;

    private Logger logger = LoggerFactory.getLogger(UserApiController.class);

    @Data
    static class CreateUserResponse {
        private Long user_id;
        private LocalDate birth;
        public CreateUserResponse(Long user_id, LocalDate birth)
        {
            this.user_id = user_id;
            this.birth = birth;
        }
    }

    @Data
    static class Description {
        private String description;
    }



    //닉네임 변경
    @PutMapping("/api/profile/{nickname}/{newnickname}")
    public int chageNickname(@PathVariable("nickname") String nickname,
                                         @PathVariable("newnickname") String newNickname) {
        try {
            return userService.changeNickname(nickname,newNickname);
        } catch (Exception e)
        {
            return 0;
        }
    }


    @GetMapping("/api/profile/gender/{gender}")
    public List<User> findMans(@PathVariable("gender") int gender) {
        try {

            return userService.findManUsers(gender);
        }
        catch (Exception e) {
            return null;
        }
    }

    @Data
    static class LoginUserRequest {
        @NotEmpty
        private String email;
        @NotEmpty
        private String password;
    }

    @Data
    @AllArgsConstructor
    static class UpdateNicknameResponse {
        private Long id;
        private String nickname;
    }

    @DeleteMapping("/api/social/user/secession/{userEmail}")
    public int socialUserSecession(@PathVariable("userEmail") String userEmail, @RequestHeader(value = "password") String password) {
        return userService.userSocialSecession(userEmail,password);
    }


    @DeleteMapping("/api/user/secession/{userEmail}")
    public int userSecession(@PathVariable("userEmail") String userEmail, @RequestHeader(value = "password") String password) {
        return userService.userSecession(userEmail,password);
    }
}
