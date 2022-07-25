package com.ssafy.AwA.service;

import com.ssafy.AwA.config.CommonResponse;
import com.ssafy.AwA.config.JwtTokenProvider;
import com.ssafy.AwA.config.SignInResultDto;
import com.ssafy.AwA.config.SignUpResultDto;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.domain.user.UserDetails;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    //회원가입 잘되면 user_id 반환 / 안되면 0 반환
    public Long join(User user) {
        userRepository.save(user);
        return user.getUser_id();
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

   public int changeNickname(String nickname, String newNickname) {
       User findByNickname = userRepository.findByNickname(nickname);
       findByNickname.changeNickname(newNickname);

       if(findByNickname.getNickname().equals(newNickname))
           return 1;
       return 0;
   }

   public int changeDescription(String nickname, String description) {
       User findByNickname = userRepository.findByNickname(nickname);
       findByNickname.changeDescription(description);

       if(findByNickname.getDescription().equals(description))
           return 1;
       return 0;
   }

   public List<User> findManUsers(int gender) {
       return userRepository.findUserByGender(gender);
   }
//    @Transactional
//    public Long updateNickname(String nickname, String newNickname) {
//        //User findUser = userRepository.findByNickname(nickname);
//        User findUser = userRepo.getUserByNickname(nickname);
//        findUser.updateNickname(newNickname);
//        return findUser.getUser_id();
//    }


    //로그인
    public User login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User loadUserByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    //로그인
    public SignUpResultDto signUp(String email, String password, String nickname, String role) {
        logger.info("[getSignUpResult] 회원 가입 정보 전달");
        User user;
        if(role.equalsIgnoreCase("admin")) {
            user = User.builder()
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .nickname(nickname)
                    .roles(Collections.singletonList("ROLE_ADMIN"))
                    .build();
        }
        else {
            user = User.builder()
                    .email(email)
                    .nickname(nickname)
                    .password(passwordEncoder.encode(password))
                    .roles(Collections.singletonList("ROLE_USER"))
                    .build();
        }

        User savedUser = userRepository.save(user);
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
        SignInResultDto signInResultDto = SignInResultDto.builder()
                .token(jwtTokenProvider.createToken(String.valueOf(user.getEmail()), user.getRoles()))
                .build();

        logger.info("[getSignInResult] SignInREsultDto 객체에 값 주입");
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
    //회원 팔로워 조회

    //회원 팔로잉 조회회
}
