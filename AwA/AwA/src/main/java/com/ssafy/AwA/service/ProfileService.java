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
    public int changeDescription(String nickname, String description) {

        Profile findByNickname = profileRepository.findByNickname(nickname);
        findByNickname.changeDescription(description);

        if(findByNickname.getDescription().equals(description))
            return 1;
        return 0;
    }

    public Profile getProfile(String targetNickname) {
        return profileRepository.findByNickname(targetNickname);
    }

    public Profile createProfile(String targetNickname) {
        Profile newProfile = Profile.builder()
                .nickname(targetNickname)
                .build();

        return profileRepository.save(newProfile);
    }
}
