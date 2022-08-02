package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.artwork.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArtworkRepository extends JpaRepository<Artwork, Long> {

    @Query("select a from Artwork  a where a.artwork_id=:artwork_id")
    Artwork findByArtwork_id(@Param("artwork_id") Long artwork_id);


}
