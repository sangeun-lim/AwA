package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.ProfileDto;
import com.ssafy.AwA.service.ProfileService;
import com.ssafy.AwA.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileApiController {

    private final ProfileService profileService;
    private final UserService userService;

    @GetMapping("/{userEmail}")
    public ProfileDto getProfile(@PathVariable(name = "userEmail") String userEmail) {
        User targetUser = userService.findByEmail(userEmail);

        String targetNickname = targetUser.getNickname();
        Profile profile = profileService.getProfile(targetNickname);

        return ProfileDto.builder()
                .profilePictureURL(profile.getProfilePictureURL())
                .nickname(profile.getNickname())
                .description(profile.getDescription())
                .build();

    }

    @PutMapping("/{userEmail}/picture/{newPictureURL}")
    public String updateProfilePictureURL(@PathVariable(name = "userEmail") String userEmail,@PathVariable(name = "newPictureURL") String url) {
        User targetUser = userService.findByEmail(userEmail);
        Profile targetProfile = profileService.getProfile(targetUser.getNickname());

        profileService.changePictureURL(targetUser.getNickname(), url);
        return targetProfile.getProfilePictureURL();
    }

    @PutMapping("/{userEmail}/nickname/{newNickname}")
    public String updateProfileNickname(@PathVariable(name = "userEmail") String userEmail,@PathVariable(name = "newNickname") String newNickname) {
        User targetUser = userService.findByEmail(userEmail);
        Profile targetProfile = profileService.getProfile(targetUser.getNickname());

        profileService.changeNickname(targetUser.getNickname(), newNickname);
        return targetProfile.getNickname();
    }

    @PutMapping("/{userEmail}/description/{description}")
    public String updateDescription(@PathVariable(name = "userEmail") String userEmail, @PathVariable(name = "description") String description) {
        User targetUser = userService.findByEmail(userEmail);
        Profile targetProfile = profileService.getProfile(targetUser.getNickname());

        profileService.changeDescription(targetUser.getNickname(), description);
        return targetProfile.getDescription();
    }

}
