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
    public int likeArtwork(String nickname, Long artwork_id) {
        Profile targetProfile = profileRepository.findByNickname(nickname);
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);

        Likes like = Likes.builder()
                .artwork(targetArtwork)
                .profile(targetProfile)
                .build();

        targetArtwork.addLike_count();
        if(likeRepository.findByArtworkAndProfile(targetArtwork,targetProfile) == null) {
            likeRepository.save(like);
            return 1;
        }
        else return 0;
    }

    public void unlikeArtwork(String nickname, Long artwork_id) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);
        Profile targetProfile = profileRepository.findByNickname(nickname);

        Likes targetLike = likeRepository.findByArtworkAndProfile(targetArtwork,targetProfile);
        likeRepository.delete(targetLike);
    }

    public boolean isLike(String nickname, Long artwork_id) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);
        Profile targetProfile = profileRepository.findByNickname(nickname);

        if(likeRepository.findByArtworkAndProfile(targetArtwork,targetProfile) == null) //존재하지 않으면
            return false;
        return true;
    }
}
