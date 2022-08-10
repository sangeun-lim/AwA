package com.ssafy.AwA.auth;

import com.ssafy.AwA.auth.userinfo.GoogleUserInfo;
import com.ssafy.AwA.auth.userinfo.KakaoUserInfo;
import com.ssafy.AwA.auth.userinfo.NaverUserInfo;
import com.ssafy.AwA.auth.userinfo.Oauth2UserInfo;
import com.ssafy.AwA.config.security.JwtTokenProvider;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.repository.UserRepository;
import com.ssafy.AwA.service.SignService;
import com.ssafy.AwA.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final SignService signService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User =  super.loadUser(userRequest);

        Oauth2UserInfo oauth2UserInfo = null;
        String provider = userRequest.getClientRegistration().getRegistrationId();    //google 또는 naver
        if(provider.equals("google")){
            oauth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }else if(provider.equals("naver")){
            oauth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
        }else if(provider.equals("kakao")){
            oauth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        }

        String token = userRequest.getAccessToken().getTokenValue();
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        System.out.println(token);
//        Random random = new Random();

//        for (int i = 0; i < 6; i++) {
//
//            temp += random.nextInt(9);
//        }

        String email = oauth2UserInfo.getEmail();                        //이메일
        String nickname = oauth2UserInfo.getProvider() + "_user" + UUID.randomUUID().toString().substring(0, 6);

        String temp = ""; //암호화전 비밀번호

        temp = oauth2UserInfo.getEmail();
        String password = passwordEncoder.encode(temp);
        // 비밀번호. 사용자가 입력한 적은 없지만 만들어준다.

        User findUser = userRepository.findByEmail(email);
        //DB에 없는 사용자라면 회원가입처리
        if(findUser == null){
            findUser = User.builder()
                    .nickname(nickname)
                    .password(password)
                    .roles(Collections.singletonList("ROLE_USER"))
                    .email(email).build();
            userRepository.save(findUser);
            Profile profile = Profile.builder()
                    .nickname(nickname)
                    .owner_user(findUser)
                    .build();
            profileRepository.save(profile);

        }
        System.out.println("순서확인1");
        User user = userRepository.findByEmail(email);

        System.out.println("암호화된 비밀번호 :"+user.getPassword());
        System.out.println("암호화 전 비밀번호 : " +temp);

        if (!passwordEncoder.matches(temp, user.getPassword())) {
            System.out.println(passwordEncoder.encode(temp));
            System.out.println(user.getPassword());
            logger.info("비밀번호 다를수가 없음");
            throw new RuntimeException();
        }

        signService.signIn(email, temp); //이메일 있으면 로그인처리


        return new PrincipalDetails(findUser, oauth2UserInfo);
    }
}
