package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.like.Likes;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.repository.ArtworkRepository;
import com.ssafy.AwA.repository.LikeRepository;
import com.ssafy.AwA.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final ArtworkRepository artworkRepository;
    private final ProfileRepository profileRepository;
    private final LikeRepository likeRepository;
    public void likeArtwork(String nickname, Long artwork_id) {
        Profile targetProfile = profileRepository.findByNickname(nickname);
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);

        Likes like = Likes.builder()
                .artwork(targetArtwork)
                .profile(targetProfile)
                .build();

        likeRepository.save(like);
    }

    public void unlikeArtwork(String nickname, Long artwork_id) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);
        Profile targetProfile = profileRepository.findByNickname(nickname);

        Likes targetLike = likeRepository.findByArtworkAndProfile(targetArtwork,targetProfile);
        likeRepository.delete(targetLike);
    }
}
