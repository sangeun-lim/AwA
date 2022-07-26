package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.follow.Follow;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.FollowRepository;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    //fromEmail->toEmail 팔로우

    public Follow save(String fromEmail, String toEmail) {
        User fromUser = userRepository.findByEmail(fromEmail);
        User toUser = userRepository.findByEmail(toEmail);

        Follow newFollow = Follow.builder()
                        .fromUser(fromUser)
                        .toUser(toUser)
                        .build();

        return followRepository.save(newFollow);
    }

    public Follow getFollowIdByFromUserEmailToUserEmail(String fromUserEmail, String toUserEmail) {
        User fromUser = userRepository.findByEmail(fromUserEmail);
        User toUser = userRepository.findByEmail(toUserEmail);

        return followRepository.findByFromUserAndToUser(fromUser,toUser);

    }
}

