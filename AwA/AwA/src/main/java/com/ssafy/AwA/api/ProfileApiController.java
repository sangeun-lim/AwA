package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.DescriptionDto;
import com.ssafy.AwA.dto.ProfileResponseDto;
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
    public ProfileResponseDto getProfile(@PathVariable(name = "userEmail") String userEmail) {
        User targetUser = userService.findByEmail(userEmail);
        String nickname = targetUser.getNickname();

        Profile targetProfile = profileService.findByNickname(nickname);
        System.out.println(targetProfile.getNickname());
        System.out.println(targetProfile.getDescription());
        System.out.println(targetProfile.getProfile_picture_url());
        ProfileResponseDto profileResponseDto = new ProfileResponseDto(
                targetProfile.getNickname(), targetProfile.getDescription(), targetProfile.getProfile_picture_url()
        );
        return profileResponseDto;
//        return null;
    }

    @PutMapping("{userEmail}/nickname/{newNickname}")
    public String updateProfileNickname(@PathVariable(name = "userEmail")String userEmail, @PathVariable(name = "newNickname") String newNickname) {
        User targetUser = userService.findByEmail(userEmail);
        String targetNickname = targetUser.getNickname();

        Profile targetProfile = profileService.findByNickname(targetNickname);
        profileService.updateNickname(targetProfile.getProfile_id(), newNickname);

        return targetProfile.getNickname();
    }

    @PutMapping("{userEmail}/picture/{newURL}")
    public String updatePictureURL(@PathVariable(name = "userEmail") String userEmail, @PathVariable(name = "newURL") String newURL)
    {
        User targetUser = userService.findByEmail(userEmail);
        String targetNickname = targetUser.getNickname();

        Profile targetProfile = profileService.findByNickname(targetNickname);
        profileService.updatePictureURL(targetProfile.getProfile_id(), newURL);

        return targetProfile.getProfile_picture_url();
    }

    @PutMapping("{userEmail}/description")
    public String updateDescription(@PathVariable(name = "userEmail") String userEmail, @RequestBody @Valid DescriptionDto descriptionDto) {
        User targetUser = userService.findByEmail(userEmail);
        String targetNickname = targetUser.getNickname();

        Profile targetProfile = profileService.findByNickname(targetNickname);
        profileService.updateDescription(targetProfile.getProfile_id(), descriptionDto.getDescription());

        return targetProfile.getDescription();
    }
}
