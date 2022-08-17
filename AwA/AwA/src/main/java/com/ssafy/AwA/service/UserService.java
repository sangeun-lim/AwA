package com.ssafy.AwA.service;

import com.ssafy.AwA.config.security.JwtTokenProvider;
import com.ssafy.AwA.domain.comment.Comment;
import com.ssafy.AwA.domain.follow.Follow;
import com.ssafy.AwA.domain.like.Likes;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.UserDto;
import com.ssafy.AwA.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final ProfileRepository profileRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final CommentRepository commentRepository;
    private final FollowRepository followRepository;
    private final LikeRepository likeRepository;

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
               .is_manager(targetUser.is_manager())
               .is_seller(targetUser.is_seller())
               .build();

       return responseUserDto;
    }

    public String updateAccessToken(Long user_id, String refreshToken) {
        String targetUserRefreshToken = userRepository.getRefreshToken(user_id);
        User targetUser = userRepository.findByUser_id(user_id);
        if(refreshToken.equals(targetUserRefreshToken)) {
            String newAccessToken = jwtTokenProvider.createToken(targetUser.getEmail(),targetUser.getRoles());
            return newAccessToken;
        }
        else {
            return "리프레시 토큰이 맞지 않습니다.";
        }
    }

    public int userSecession(String userEmail, String emailCode) {
        User targetUser = userRepository.findByEmail(userEmail);
        Profile targetProfile = profileRepository.findByNickname(targetUser.getNickname());

        //팔로우
        List<Follow> allFollowByfromProfile = followRepository.findAllByfromProfile(targetProfile);
        for(int i=0;i<allFollowByfromProfile.size();i++)
            followRepository.delete(allFollowByfromProfile.get(i));
        //like
        List<Likes> allLikeByfromProfile = likeRepository.findAllByfromProfile(targetProfile);
        for (int i=0; i<allLikeByfromProfile.size(); i++)
            likeRepository.delete(allLikeByfromProfile.get(i));
        //댓글
        List<Comment> allCommentByfromProfile = commentRepository.findAllByfromProfile(targetProfile);
        for (int i=0; i< allCommentByfromProfile.size(); i++)
            commentRepository.delete(allCommentByfromProfile.get(i));

        if(targetUser.getEmail_code().equals(emailCode)) {
            profileRepository.delete(targetProfile);
            userRepository.delete(targetUser);
            return 1;
        }
        return 0;
    }
}
