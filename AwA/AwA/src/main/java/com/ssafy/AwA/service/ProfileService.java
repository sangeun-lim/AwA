package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public Profile findByNickname(String nickname) {
        return profileRepository.findByNickname(nickname);
    }

    public void createProfile(String nickname, User user) {
        User targetUser = userRepository.findByEmail(user.getEmail());

        Profile newProfile = Profile.builder()
                        .nickname(nickname)
                        .owner_user(user)
                        .build();

        targetUser.createProfile(newProfile);
    }

    public void updateNickname(Long profile_id, String newNickname) {
        Profile targetProfile = profileRepository.findByProfile_id(profile_id);
        String oldNickname = targetProfile.getNickname();
        User targetUser = userRepository.findByNickname(oldNickname);

        targetUser.changeNickname(newNickname);
        targetProfile.updateNickname(newNickname);
    }

    public void updatePictureURL(Long profile_id, String newURL) {
        Profile targetProfile = profileRepository.findByProfile_id(profile_id);

        targetProfile.updatePictureURL(newURL);
    }

    public void updateDescription(Long profile_id, String newDescription) {
        Profile targetProfile = profileRepository.findByProfile_id(profile_id);

        targetProfile.updateDescription(newDescription);
    }

    public void updateFavorite_Field(Long profile_id, List<String> favorite_field) {
        Profile targetProfile = profileRepository.findByProfile_id(profile_id);

        targetProfile.updateFavorite_field(favorite_field);
    }
}
