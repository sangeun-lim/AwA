package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.like.Likes;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.repository.ArtworkRepository;
import com.ssafy.AwA.repository.LikeRepository;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
public class LikeApiController {

    private final LikeService likeService;
    private final ArtworkRepository artworkRepository;
    private final ProfileRepository profileRepository;
    private final LikeRepository likeRepository;

    @PostMapping("/{nickname}/{artwork_id}")
    public int likeArtwork(@PathVariable("nickname") String nickname, @PathVariable("artwork_id") Long artwork_id) {
        if(likeService.likeArtwork(nickname, artwork_id) == 0)
        {
            return 0;
        }

        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);
        Profile targetProfile = profileRepository.findByNickname(nickname);

        Likes targetLike = likeRepository.findByArtworkAndProfile(targetArtwork,targetProfile);
        targetArtwork.addLikeCount();
        if(targetLike.getArtwork().getArtwork_id() == targetArtwork.getArtwork_id())
            if(targetLike.getProfile().getProfile_id() == targetProfile.getProfile_id())
                return 1;
        return 0;
    }

    @DeleteMapping("/{nickname}/{artwork_id}")
    public int unlikeArtwork(@PathVariable("nickname") String nickname, @PathVariable("artwork_id") Long artwork_id) {
        likeService.unlikeArtwork(nickname, artwork_id);
        return 1;
    }

    @GetMapping("have/{nickname}/{artwork_id}")
    public int isLike(@PathVariable("nickname") String nickname, @PathVariable("artwork_id") Long artwork_id)
    {
        if(likeService.isLike(nickname,artwork_id))
            return 1;
        return 0;
    }
}
