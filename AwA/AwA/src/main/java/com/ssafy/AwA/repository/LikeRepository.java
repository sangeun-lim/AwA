package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.like.Likes;
import com.ssafy.AwA.domain.profile.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikeRepository extends JpaRepository<Likes, Long> {
    @Query("select l from Likes l where l.artwork=:artwork and l.profile=:profile")
    Likes findByArtworkAndProfile(@Param("artwork") Artwork targetArtwork,@Param("profile") Profile targetProfile);


}
