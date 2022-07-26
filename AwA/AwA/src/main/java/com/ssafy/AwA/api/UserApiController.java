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

    //version 1)  엔티티를 파라미터로 받지말라 !!!!!!!!!!!!!!!!!
//    @PostMapping("/auth/signup")
//    public CreateUserResponse saveMemberV1(@RequestBody @Valid User user) {
//        Long user_id = userService.join(user);
//        return new CreateUserResponse(user_id);
//    }

    //회원가입
//    @PostMapping("/auth/signup")
//    public CreateUserResponse saveUser(@RequestBody @Valid CreateUserRequest request)
//    {
//        User user = User.builder()
//                .password(request.getPassword())
//                .birth(request.getBirth())
//                .email(request.getEmail())
//                .gender(request.gender)
//                .nickname(request.getNickname())
//                .build();
//        userService.join(user);
//        return new CreateUserResponse(user.getUser_id(), user.getBirth());
//    }









    //이메일 중복검사
    @GetMapping("/auth/signup/email/{email}")
    public int ValidateEmail(@PathVariable String email) {
        return userService.validateDuplicateEmail(email);
    }

    //닉네임 중복검사
    @GetMapping("auth/signup/nickname/{nickname}")
    public int ValidateNickname(@PathVariable String nickname) {
        return userService.validateDuplcateNickname(nickname);
    }
    //닉네임 변경
    @PutMapping("/profile/{nickname}/{newnickname}")
    public int chageNickname(@PathVariable("nickname") String nickname,
                                         @PathVariable("newnickname") String newNickname) {
        try {
            return userService.changeNickname(nickname,newNickname);
        } catch (Exception e)
        {
            return 0;
        }
    }

    @PutMapping("/profile/{nickname}/description")
    public int changeDescription(@PathVariable("nickname") String nickname, @RequestBody Description newDescription)
    {
        try {
            return userService.changeDescription(nickname, newDescription.description);
        } catch (Exception e)
        {
            return 0;
        }
    }

    @GetMapping("/profile/gender/{gender}")
    public List<User> findMans(@PathVariable("gender") int gender) {
        try {
            System.out.println("here");
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
    @PostMapping("/auth/login")
    public User login(@RequestBody @Valid LoginUserRequest request) {
       return userService.login(request.getEmail(), request.getPassword());
    }
    @Data
    @AllArgsConstructor
    static class UpdateNicknameResponse {
        private Long id;
        private String nickname;
    }

//    @Data
//    static class UpdateUserRequest {
//        private String nickname;
//    }

}
