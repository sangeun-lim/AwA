package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public void changeDescription(String nickname, String description) {
        Profile findByNickname = profileRepository.findByNickname(nickname);
        findByNickname.changeDescription(description);
    }

    public void changeNickname(String nickname, String newNickname) {
        Profile findByNickname = profileRepository.findByNickname(nickname);
        findByNickname.changeNickname(newNickname);
    }

    public void changePictureURL(String nickname, String url) {
        Profile findByNickname = profileRepository.findByNickname(nickname);
        findByNickname.changeProfilePictureURL(url);
    }

    public Profile getProfile(String targetNickname) {
        return profileRepository.findByNickname(targetNickname);
    }

    public Profile createProfile(String targetNickname, User user) {
        Profile newProfile = Profile.builder()
                .nickname(targetNickname)
                .user(user)
                .build();

        return profileRepository.save(newProfile);
    }



}
