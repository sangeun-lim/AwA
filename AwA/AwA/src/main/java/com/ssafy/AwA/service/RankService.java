package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.ArtworkResponseDto;
import com.ssafy.AwA.dto.AttachmentRequestDto;
import com.ssafy.AwA.dto.ProfileRankResponseDto;
import com.ssafy.AwA.dto.ProfileResponseDto;
import com.ssafy.AwA.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RankService {

    private final ProfileRepository profileRepository;
    private final LikeRepository likeRepository;
    private final ArtworkRepository artworkRepository;

    private final FollowRepository followRepository;

    private final UserRepository userRepository;

    public List<ArtworkResponseDto> getLikeTop10ArtworkList() {
          List<Long> topLikeArtworkList = likeRepository.getTopLikeArtwork();

        List<ArtworkResponseDto> artworkResponseDtoList = new ArrayList<>();

        for(int i=0;i<topLikeArtworkList.size();i++) {
            if(i==10)
                return artworkResponseDtoList;
            Artwork targetArtwork = artworkRepository.findByArtwork_id(topLikeArtworkList.get(i));

            User sellUser = targetArtwork.getSell_user();
            Profile sellUserProfile = profileRepository.findByNickname(sellUser.getNickname());

            List<AttachmentRequestDto> attachmentRequestDtoList = new ArrayList<>();
            for (int j = 0; j < targetArtwork.getAttachment_list().size(); j++)
            {       attachmentRequestDtoList.add(AttachmentRequestDto.builder()
                    .type(targetArtwork.getAttachment_list().get(j).getType())
                    .url(targetArtwork.getAttachment_list().get(j).getUrl())
                    .build()
            );
            }

            artworkResponseDtoList.add(ArtworkResponseDto.builder()
                    .sell_user_email(sellUser.getEmail())
                    .profile_picture(sellUserProfile.getProfile_picture_url())
                    .createdDate(targetArtwork.getCreatedDate())
                    .description(targetArtwork.getDescription())
                    .artwork_id(targetArtwork.getArtwork_id())
                    .sell_user_nickname(sellUser.getNickname())
                    .title(targetArtwork.getTitle())
                    .view_count(targetArtwork.getView_count())
                    .price(targetArtwork.getPrice())
                    .genre(targetArtwork.getGenre())
                    .ingredient(targetArtwork.getIngredient())
                    .attachmentRequestDtoList(attachmentRequestDtoList)
                    .build());
        }

        return artworkResponseDtoList;
    }

    public List<ProfileRankResponseDto> getFollowTop10ProfileList() {
        List<Long> top10ByFollowing = followRepository.findTop10ByFollowing();

        List<ProfileRankResponseDto> profileRankResponseDto = new ArrayList<>();
        for(int i=0;i<top10ByFollowing.size();i++) {
            if(i==10)
                break;

            Long topProfileId = top10ByFollowing.get(i);
            Profile targetProfile = profileRepository.findByProfile_id(topProfileId);
            User targetUser = userRepository.findByNickname(targetProfile.getNickname());
            ProfileRankResponseDto responseDto = ProfileRankResponseDto.builder()
                    .nickname(targetProfile.getNickname())
                    .profile_picture_url(targetProfile.getProfile_picture_url())
                    .email(targetUser.getEmail())
                    .build();

            profileRankResponseDto.add(responseDto);
        }

        return profileRankResponseDto;
    }
}
