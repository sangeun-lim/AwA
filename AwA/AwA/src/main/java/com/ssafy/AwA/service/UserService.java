package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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
    //회원 팔로워 조회

    //회원 팔로잉 조회회
}
