package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.dto.ArtworkDto;
import com.ssafy.AwA.dto.ArtworkResponseDto;
import com.ssafy.AwA.repository.ArtworkRepository;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArtworkService {

    private final Logger logger = LoggerFactory.getLogger(ArtworkService.class);
    private final ArtworkRepository artworkRepository;
    private final UserRepository userRepository;

    public ArtworkResponseDto saveArtwork(ArtworkDto artworkDto) {
        Artwork artwork = Artwork.builder()
                .sell_user(userRepository.findByNickname(artworkDto.getSell_user()))
                .price(artworkDto.getPrice())
                .title(artworkDto.getTitle())
                .build();

        Artwork savedArtwork = artworkRepository.save(artwork);
        logger.info("[saveArtwork] 새로운 Artwork 저장 {}", savedArtwork.getTitle());

        ArtworkResponseDto artworkResponseDto = new ArtworkResponseDto();
        artworkResponseDto.setArtwork_id(savedArtwork.getArtwork_id());
        artworkResponseDto.setPrice(savedArtwork.getPrice());
        artworkResponseDto.setSell_user(savedArtwork.getSell_user().getEmail());
        artworkResponseDto.setTitle(savedArtwork.getTitle());

        return artworkResponseDto;
    }
}
