package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.SignInResultDto;
import com.ssafy.AwA.dto.SignUpResultDto;
import com.ssafy.AwA.dto.UserDto;
import com.ssafy.AwA.service.ProfileService;
import com.ssafy.AwA.service.SignService;
import com.ssafy.AwA.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class SignApiController {

    private final SignService signService;
    private final UserService userService;
    private final ProfileService profileService;


    private Logger logger = LoggerFactory.getLogger(SignApiController.class);

    @Data
    static class loginRequest {
        @NotEmpty
        private String email;
        @NotEmpty
        private String password;
    }

    @Data
    static class CreateUserRequest {
        @NotEmpty
        private String email;
        @NotEmpty
        private String password;
        @NotEmpty
        private String nickname;
        private boolean gender;

        @DateTimeFormat(pattern = "yyyy-mm-dd")
        private LocalDate birth;
    }
//    @ApiImplicitParams({
//            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
//    })
    @GetMapping("/userinfo")
    public UserDto userInfo(@RequestHeader(value="RefreshToken") String token)
    {
        return userService.findByToken(token);
    }

    //반환하는 객체 boolean success, int code, String msg, String token(email, role)
    @PostMapping("/sign-in")
    public SignInResultDto signIn(@RequestBody @Valid loginRequest request) {
        SignInResultDto signInResultDto = signService.signIn(request.email, request.password);

        if(signInResultDto.getCode() == 0) {
            logger.info("[signIn] 정상적으로 로그인 되었습니다. id {} , AccessToken : {}, RefreshToken : {}", request.email, signInResultDto.getAccessToken(),signInResultDto.getRefreshToken());
        }

        return signInResultDto;
    }

//    @PostMapping("/sns-sign-in")
//    public SignInResultDto signIn(@RequestBody @Valid CreateUserRequest request) {
//        SignInResultDto signInResultDto = signService.signIn(request.email, request.password);
//
//        if(signInResultDto.getCode() == 0) {
//            logger.info("[signIn] 정상적으로 로그인 되었습니다. id {} , AccessToken : {}, RefreshToken : {}", request.email, signInResultDto.getAccessToken(),signInResultDto.getRefreshToken());
//        }
//
//        return signInResultDto;
//    }


    //반환하는 객체 boolean success, int code, String msg
    @PostMapping("/sign-up")
    public SignUpResultDto signUp(@RequestBody @Valid CreateUserRequest request) {
        logger.info("[signUp] 회원가입을 수행합니다. id : {}, password : ****, name : {}", request.getEmail(), request.getNickname());
        SignUpResultDto signUpResultDto = signService.signUp(request.email, request.password, request.nickname, request.gender, request.birth);

        logger.info("[signUp] 회원가입을 완료했습니다.");

        return signUpResultDto;
    }

    //리프레시 토큰 이용한 access token 재발급
    @PostMapping("/refresh/{user_id}/{refreshToken}")
    public String updateAccessToken(@PathVariable(name = "user_id") Long user_id, @PathVariable(name = "refreshToken") String refreshToken) {
        return userService.updateAccessToken(user_id, refreshToken);
    }
    @GetMapping(value = "/exception")
    public void exceptionTest() throws RuntimeException {
        throw new RuntimeException("접근이 금지되었습니다.");
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<Map<String, String>> ExceptionHandler(RuntimeException e) {
        HttpHeaders responseHeaders = new HttpHeaders();
        //responseHeaders.add(HttpHeaders.CONTENT_TYPE, "application/json");
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

        logger.error("ExceptionHandler 호출, {}, {}", e.getCause(), e.getMessage());

        Map<String, String> map = new HashMap<>();
        map.put("error type", httpStatus.getReasonPhrase());
        map.put("code", "400");
        map.put("message", "에러 발생");

        return new ResponseEntity<>(map, responseHeaders, httpStatus);
    }

    //이메일 중복검사
    @GetMapping("/sign-up/email/{email}")
    public int ValidateEmail(@PathVariable String email) {
        return signService.validateDuplicateEmail(email);
    }

    //닉네임 중복검사
    @GetMapping("/sign-up/nickname/{nickname}")
    public int ValidateNickname(@PathVariable String nickname) {
        return signService.validateDuplcateNickname(nickname);
    }

    @PostMapping("/check/password/{userEmail}")
    public int checkPassword(@PathVariable(name = "userEmail") String userEmail, @RequestHeader(value="password") String password) {
        return signService.checkPassword(userEmail, password);
    }

    @PostMapping("/reset/password/{userEmail}")
    public int resetPassword(@PathVariable(name = "userEmail") String userEmail, @RequestHeader(value = "password") String password) {
        return signService.resetPassword(userEmail, password);
    }
}
