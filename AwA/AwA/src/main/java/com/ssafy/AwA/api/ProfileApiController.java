package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.service.ProfileService;
import com.ssafy.AwA.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileApiController {

    private final ProfileService profileService;
    private final UserService userService;

    @GetMapping("/{userEmail}")
    public Profile getProfile(@PathVariable(name = "userEmail") String userEmail) {
        User targetUser = userService.findByEmail(userEmail);

        String targetNickname = targetUser.getNickname();
        return profileService.getProfile(targetNickname);
    }

}
