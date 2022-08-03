package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.ProfileResponseDto;
import com.ssafy.AwA.repository.FollowRepository;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    public Profile findByNickname(String nickname) {
        return profileRepository.findByNickname(nickname);
    }

    public ProfileResponseDto getProfile(String userEmail) {
        User targetUser = userRepository.findByEmail(userEmail);
        String nickname = targetUser.getNickname();

        Profile targetProfile = profileRepository.findByNickname(nickname);
        System.out.println(targetProfile.getNickname());

        List<Profile> followingList = followRepository.getFollowingList(targetProfile);
        List<Profile> followerList = followRepository.getFollwerList(targetProfile);

        System.out.println("나를 팔로우 하는 사람들" + followerList.get(0).getNickname());
        System.out.println("내가 팔로우 하는 사람들" + followingList.get(0).getNickname());

        ProfileResponseDto profileResponseDto = ProfileResponseDto.builder()
                .nickname(targetProfile.getNickname())
                .owner_user(targetUser.getUser_id())
                .picture_url(targetProfile.getProfile_picture_url())
                .description(targetProfile.getDescription())
                .favorite_field(targetProfile.getFavorite_field())
                .follower_list(followerList)
                .following_list(followingList)
                .build();

        return profileResponseDto;
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
