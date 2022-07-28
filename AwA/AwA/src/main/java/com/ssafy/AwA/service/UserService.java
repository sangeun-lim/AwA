package com.ssafy.AwA.service;

import com.ssafy.AwA.config.security.JwtTokenProvider;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.UserDto;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;




   public int changeNickname(String nickname, String newNickname) {
       User findByNickname = userRepository.findByNickname(nickname);
       findByNickname.changeNickname(newNickname);

       if(findByNickname.getNickname().equals(newNickname))
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

    public User findByEmail(String userEmail) {
       return userRepository.findByEmail(userEmail);
    }

    public UserDto findByToken(String token) {
       User targetUser = userRepository.findByToken(token);

       UserDto responseUserDto = UserDto.builder()
               .user_id(targetUser.getUser_id())
               .birth(targetUser.getBirth())
               .gender(targetUser.isGender())
               .nickname(targetUser.getNickname())
               .email(targetUser.getEmail())
               .build();

       return responseUserDto;
    }


    //회원 팔로워 조회

    //회원 팔로잉 조회회
}
