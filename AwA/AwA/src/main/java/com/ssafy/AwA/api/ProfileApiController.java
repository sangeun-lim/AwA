package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.*;
import com.ssafy.AwA.service.ProfileService;
import com.ssafy.AwA.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @PostMapping("/list")
    public List<ProfileListDto> getProfileListByUserEmail(@RequestBody @Valid UserEmailListDto userEmailListDto) {
        return profileService.getProfileListByUserEmail(userEmailListDto);
    }
}
