package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.*;
import com.ssafy.AwA.service.ProfileService;
import com.ssafy.AwA.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileApiController {

    private final ProfileService profileService;
    private final UserService userService;
    @GetMapping("/{userEmail}")
    public ProfileResponseDto getProfile(@PathVariable(name = "userEmail") String userEmail) {
        return profileService.getProfile(userEmail);
    }

    @PutMapping("/{userEmail}")
    public ProfileUpdateResponse updateProfile(@PathVariable(name = "userEmail") String userEmail, @RequestBody @Valid ProfileRequestDto profileRequestDto) {
        return profileService.updateProfile(userEmail, profileRequestDto);
    }
//    @PutMapping("{userEmail}/nickname/{newNickname}")
//    public String updateProfileNickname(@PathVariable(name = "userEmail")String userEmail, @PathVariable(name = "newNickname") String newNickname) {
//        User targetUser = userService.findByEmail(userEmail);
//        String targetNickname = targetUser.getNickname();
//
//        Profile targetProfile = profileService.findByNickname(targetNickname);
//        profileService.updateNickname(targetProfile.getProfile_id(), newNickname);
//
//        return targetProfile.getNickname();
//    }
//
//    @PutMapping("{userEmail}/picture/{newURL}")
//    public String updatePictureURL(@PathVariable(name = "userEmail") String userEmail, @PathVariable(name = "newURL") String newURL)
//    {
//        User targetUser = userService.findByEmail(userEmail);
//        String targetNickname = targetUser.getNickname();
//
//        Profile targetProfile = profileService.findByNickname(targetNickname);
//        profileService.updatePictureURL(targetProfile.getProfile_id(), newURL);
//
//        return targetProfile.getProfile_picture_url();
//    }
//
//    @PutMapping("{userEmail}/description")
//    public String updateDescription(@PathVariable(name = "userEmail") String userEmail, @RequestBody @Valid DescriptionDto descriptionDto) {
//        User targetUser = userService.findByEmail(userEmail);
//        String targetNickname = targetUser.getNickname();
//
//        Profile targetProfile = profileService.findByNickname(targetNickname);
//        profileService.updateDescription(targetProfile.getProfile_id(), descriptionDto.getDescription());
//
//        return targetProfile.getDescription();
//    }
//
//    @PutMapping("{userEmail}/favorite_field")
//    public Favorite_fieldDto updateFavorite_field(@PathVariable(name = "userEmail") String userEmail, @RequestBody @Valid Favorite_fieldDto favorite_fieldDto) {
//        User targetUser = userService.findByEmail(userEmail);
//        Profile targetProfile = profileService.findByNickname(targetUser.getNickname());
//
//        profileService.updateFavorite_Field(targetProfile.getProfile_id(), favorite_fieldDto.getFavorite_field());
//
//        Favorite_fieldDto responseDto = Favorite_fieldDto.builder()
//                .favorite_field(targetProfile.getFavorite_field())
//                .build();
//
//        return responseDto;
//    }
}
