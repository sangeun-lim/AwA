package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.ProfileArtworkResponse;
import com.ssafy.AwA.dto.ProfileRequestDto;
import com.ssafy.AwA.dto.ProfileResponseDto;
import com.ssafy.AwA.dto.ProfileUpdateResponse;
import com.ssafy.AwA.repository.*;
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
    private final ArtworkRepository artworkRepository;
    private final LikeRepository likeRepository;

    public Profile findByNickname(String nickname) {
        return profileRepository.findByNickname(nickname);
    }

    public ProfileResponseDto getProfile(String userEmail) {
        User targetUser = userRepository.findByEmail(userEmail);
        String nickname = targetUser.getNickname();

        Profile targetProfile = profileRepository.findByNickname(nickname);


        List<Profile> followingList = followRepository.getFollowingList(targetProfile);
        List<Profile> followerList = followRepository.getFollwerList(targetProfile);

        List<Artwork> sellArtworkList = artworkRepository.findAllBySell_user(targetUser);
        List<Artwork> likeArtworkList = likeRepository.findAllByProfile(targetProfile);

        List<ProfileArtworkResponse> sellProfileArtworkResponses = new ArrayList<>();
        for(int i=0;i<sellArtworkList.size();i++)
        {
            Artwork targetArtwork = sellArtworkList.get(i);

            if(targetArtwork.getAttachment_list().size() > 0) {
                ProfileArtworkResponse profileArtworkResponse = ProfileArtworkResponse.builder()
                        .artwork_id(targetArtwork.getArtwork_id())
                        .genre(targetArtwork.getGenre())
                        .createdDate(targetArtwork.getCreatedDate())
                        .title(targetArtwork.getTitle())
                        .picture_url(targetArtwork.getAttachment_list().get(0).getUrl())
                        .build();
                sellProfileArtworkResponses.add(profileArtworkResponse);
            }
            else {
                ProfileArtworkResponse profileArtworkResponse = ProfileArtworkResponse.builder()
                        .artwork_id(targetArtwork.getArtwork_id())
                        .genre(targetArtwork.getGenre())
                        .createdDate(targetArtwork.getCreatedDate())
                        .title(targetArtwork.getTitle())
                        .build();
                sellProfileArtworkResponses.add(profileArtworkResponse);
            }
        }

        List<ProfileArtworkResponse> likeProfileArtworkResponses = new ArrayList<>();
        for(int i=0;i<likeArtworkList.size();i++) {
            Artwork targetArtwork = likeArtworkList.get(i);

            if(targetArtwork.getAttachment_list().size() > 0) {
                ProfileArtworkResponse profileArtworkResponse = ProfileArtworkResponse.builder()
                        .artwork_id(targetArtwork.getArtwork_id())
                        .genre(targetArtwork.getGenre())
                        .createdDate(targetArtwork.getCreatedDate())
                        .title(targetArtwork.getTitle())
                        .picture_url(targetArtwork.getAttachment_list().get(0).getUrl())
                        .build();
                likeProfileArtworkResponses.add(profileArtworkResponse);
            }
            else {
                ProfileArtworkResponse profileArtworkResponse = ProfileArtworkResponse.builder()
                        .artwork_id(targetArtwork.getArtwork_id())
                        .genre(targetArtwork.getGenre())
                        .createdDate(targetArtwork.getCreatedDate())
                        .title(targetArtwork.getTitle())
                        .build();
                likeProfileArtworkResponses.add(profileArtworkResponse);
            }

        }

        ProfileResponseDto profileResponseDto = ProfileResponseDto.builder()
                .nickname(targetProfile.getNickname())
                .owner_user(targetUser.getUser_id())
                .picture_url(targetProfile.getProfile_picture_url())
                .description(targetProfile.getDescription())
                .favorite_field(targetProfile.getFavorite_field())
                .follower_list(followerList)
                .following_list(followingList)
                .artwork_list(sellProfileArtworkResponses)
                .liked_artwork_list(likeProfileArtworkResponses)
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

    public ProfileUpdateResponse updateProfile(String userEmail, ProfileRequestDto profileRequestDto) {
        System.out.println(profileRequestDto.getNickname() + " here");
        User targetUser = userRepository.findByEmail(userEmail);
        Profile targetProfile = profileRepository.findByNickname(targetUser.getNickname());


        targetProfile.updateFavorite_field(profileRequestDto.getFavorite_field());
        //닉네임 변경은 유저까지 같이
        targetProfile.updateNickname(profileRequestDto.getNickname());
        targetUser.changeNickname(profileRequestDto.getNickname());

        targetProfile.updateDescription(profileRequestDto.getDescription());
        targetProfile.updatePictureURL(profileRequestDto.getProfile_picture_url());

        ProfileUpdateResponse profileUpdateResponse = ProfileUpdateResponse.builder()
                .nickname(targetProfile.getNickname())
                .description(targetProfile.getDescription())
                .favorite_field(targetProfile.getFavorite_field())
                .picture_url(targetProfile.getProfile_picture_url())
                .build();

         return profileUpdateResponse;
    }
}
