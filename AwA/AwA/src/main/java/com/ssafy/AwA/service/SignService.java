package com.ssafy.AwA.service;

import com.ssafy.AwA.config.security.CommonResponse;
import com.ssafy.AwA.config.security.JwtTokenProvider;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.dto.SignInResultDto;
import com.ssafy.AwA.dto.SignUpResultDto;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor
public class SignService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public SignUpResultDto signUp(String email, String password, String nickname, boolean gender, LocalDate birth
                                  //String role 무조건 User로 회원가입 할거니까 권한 USER
                                   ) {
        logger.info("[getSignUpResult] 회원 가입 정보 전달");
        User user;


//        if(role.equalsIgnoreCase("admin")) {
//            user = User.builder()
//                    .email(email)
//                    .password(passwordEncoder.encode(password))
//                    .nickname(nickname)
//                    .roles(Collections.singletonList("ROLE_ADMIN"))
//                    .build();
//        }
//        else {
//        }

        user = User.builder()
                .email(email)
                .nickname(nickname)
                .password(passwordEncoder.encode(password)) //password암호화 인코딩
                .gender(gender)
                .birth(birth)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();

        User savedUser = userRepository.save(user);
        Profile profile = Profile.builder()
                .nickname(nickname)
                .owner_user(user)
                .build();
        profileRepository.save(profile);
        SignUpResultDto signUpResultDto = new SignInResultDto();

        logger.info("[getSignUpResult] userEntity 값이 들어왔는지 확인 후 결과값 주입");
        if(!savedUser.getEmail().isEmpty()) {
            logger.info("[getSignUpResult] 정상 처리 완료");
            setSuccessResult(signUpResultDto);
        }
        else {
            logger.info("[getSignUpResult] 실패 처리 완료");
            setFailResult(signUpResultDto);
        }
        return signUpResultDto;
    }

    //로그인

    public SignInResultDto signIn(String email, String password) throws RuntimeException {
        logger.info("[getSignInResult] signDataHandler로 회원 정보 요청");
        User user = userRepository.findByEmail(email);
        logger.info("[getSignInResult] Email : {} ",email);

        logger.info("[getSignInResult] 패스워드 비교 수행");
        if(!passwordEncoder.matches(password, user.getPassword())) {
            logger.info("비밀번호 안맞아요 !!!!!!!!!");
            logger.info("비밀번호 안맞아요 !!!!!!!!!");
            logger.info("비밀번호 안맞아요 !!!!!!!!!");
            logger.info("비밀번호 안맞아요 !!!!!!!!!");
            throw new RuntimeException();
        }
        logger.info("[getSignInResult] 패스워드 일치");

        logger.info("[getSignInResult] SignInResultDto 생성");
        String accessToken = jwtTokenProvider.createToken(String.valueOf(user.getEmail()), user.getRoles());
        String refreshToken = jwtTokenProvider.createRefreshToken(String.valueOf(user.getEmail()), user.getRoles());

        //반환값은 액세스토큰
        SignInResultDto signInResultDto = SignInResultDto.builder()
                .token(accessToken)
                .build();

        //리프레시 토큰은 테이블에 저장
        user.giveToken(jwtTokenProvider.createRefreshToken(String.valueOf(user.getEmail()),user.getRoles()));

        logger.info("[refreshToken 값] "+refreshToken);
        logger.info("[accessToken 값] "+accessToken);
        //user.giveToken(signInResultDto.getToken());
        logger.info("[getSignInResult] SignInResultDto 객체에 값 주입");
        setSuccessResult(signInResultDto);

        return signInResultDto;
    }

    private void setSuccessResult(SignUpResultDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    private void setFailResult(SignUpResultDto result) {
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
    }

    //중복검사
    public int validateDuplicateEmail(String email) {
        //이메일 중복검사
        //중복 시 0 / 정상 1
        User findByEmailUser = userRepository.findByEmail(email);
        if(findByEmailUser == null)
            return 1;
        return 0;
    }
    //
    public int validateDuplcateNickname(String nickname) {
        //닉네임 중복검사
        User findByNicknameUser = userRepository.findByNickname(nickname);
        if(findByNicknameUser==null)
            return 1;
        return 0;
    }
}
