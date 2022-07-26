package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.artwork.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtworkRepository extends JpaRepository<Artwork, Long> {

}
