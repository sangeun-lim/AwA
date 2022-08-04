package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.follow.Follow;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.FollowRepository;
import com.ssafy.AwA.repository.UserRepository;
import com.ssafy.AwA.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowApiController {

    private final FollowRepository followRepository;
    private final FollowService followService;


    @PostMapping("/{fromUserEmail}/{toUserEmail}")
    public Follow followUser(@PathVariable(name = "fromUserEmail") String fromUserEmail, @PathVariable(name = "toUserEmail") String toUserEmail) {
        return followService.save(fromUserEmail, toUserEmail);
    }

    @DeleteMapping("/{fromUserEmail}/{toUserEmail}")
    public int unFollowUser(@PathVariable(name = "fromUserEmail") String fromUserEmail, @PathVariable(name = "toUserEmail") String toUserEmail) {
        Follow follow = followService.getFollowIdByFromUserEmailToUserEmail(fromUserEmail,toUserEmail);
        followRepository.deleteById(follow.getFollow_id());
        return 1;
    }

    @GetMapping("/have/{fromUserEmail}/{toUserEmail}")
    public int haveFollow(@PathVariable(name = "fromUserEmail") String fromUserEmail, @PathVariable(name = "toUserEmail") String toUserEmail) {
        return followService.haveFollow(fromUserEmail, toUserEmail);
    }
}
