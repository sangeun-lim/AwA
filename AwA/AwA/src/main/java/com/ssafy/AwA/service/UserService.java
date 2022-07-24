package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    //회원가입 잘되면 user_id 반환 / 안되면 0 반환
    public Long join(User user) {
//        int emailDuplicateUser = validateDuplicateEmail(user); //이메일 중복검사
//        if(emailDuplicateUser != 0)
//            return Long.valueOf(0);
//
//        int nicknameDuplicateUser = validateDuplcateNickname(user); //닉네임 중복검사
//        if(nicknameDuplicateUser != 0 )
//            return Long.valueOf(0);

        userRepository.save(user);
        return user.getUser_id();
    }

//    //중복검사
//    private int validateDuplicateEmail(User user) {
//        //이메일 중복검사
//
//        List<User> findByEmailUsers = userRepository.findByEmail(user.getEmail());
//        if(!findByEmailUsers.isEmpty()) {
//            //throw new IllegalStateException("중복된 이메일입니다.");
//            return 1;
//        }
//        else return 0;
//    }
//
//    private int validateDuplcateNickname(User user) {
//        //닉네임 중복검사
//        List<User> findByNicknameUsers = userRepository.findByNickname(user.getNickname());
//        if(!findByNicknameUsers.isEmpty()) {
//            return 1;
//        }
//        else return 0;
//    }

    //특정 회원조회
    @Transactional(readOnly = true)
    public User findOne(Long userId) {
        return userRepository.findOne(userId);
    }

    //회원 전체조회
    @Transactional(readOnly = true)
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
    //회원 팔로워 조회

    //회원 팔로잉 조회회
}
