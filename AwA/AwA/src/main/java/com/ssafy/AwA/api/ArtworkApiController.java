package com.ssafy.AwA.api;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.dto.*;
import com.ssafy.AwA.repository.ArtworkRepository;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.service.ArtworkService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/artwork")
public class ArtworkApiController {

    private final Logger logger = LoggerFactory.getLogger(ArtworkApiController.class);

    private final ArtworkService artworkService;
    private final ArtworkRepository artworkRepository;

    private final ProfileRepository profileRepository;


    @PostMapping
    public ResponseEntity<ArtworkResponseDto> createArtwork(@RequestBody @Valid ArtworkRequestDto artworkRequestDto, @RequestHeader(value="X-AUTH-TOKEN") String token, @RequestHeader(value="RefreshToken") String refreshToken ) {
        ArtworkResponseDto artworkResponseDto = artworkService.saveArtwork(artworkRequestDto);

        return ResponseEntity.status(HttpStatus.OK).body(artworkResponseDto);
    }

    @GetMapping("/page/{pageNo}")
    public ArtworkPageDto getArtworksByPageNo(@PathVariable("pageNo") int pageNo) {
        return artworkService.getArtworksByPageNo(pageNo);
    }
    @GetMapping
    public List<ArtworkResponseDto> getAllArtwork() {
        List<ArtworkResponseDto> artworkResponseDto = artworkService.getAllArtwork();

        return artworkResponseDto;
    }

    @GetMapping("/{artwork_id}")
    public ArtworkResponseDto getArtworkById(@PathVariable("artwork_id") Long artwork_id) {
        ArtworkResponseDto artworkResponseDto = artworkService.getArtworkById(artwork_id);
        return artworkResponseDto;
    }

    @PutMapping("/{artwork_id}")
    public ArtworkResponseDto updateArtwork(@PathVariable("artwork_id") Long artwork_id, @RequestBody @Valid ArtworkRequestDto artworkRequestDto, @RequestHeader(value="X-AUTH-TOKEN") String token, @RequestHeader(value="RefreshToken") String refreshToken) {
        ArtworkResponseDto artworkResponseDto = artworkService.updateArtwork(artwork_id, artworkRequestDto, token);
        return artworkResponseDto;
    }

    @PutMapping("/sell/{artwork_id}")
    public int sellArtwork(@PathVariable("artwork_id") Long artwork_id) {
        return artworkService.sellArtwork(artwork_id);
    }
    @DeleteMapping("{artwork_id}")
    public int deleteArtwork(@PathVariable("artwork_id") Long artwork_id, @RequestHeader(value="X-AUTH-TOKEN") String token, @RequestHeader(value="RefreshToken") String refreshToken) {
        return artworkService.deleteArtwork(artwork_id);
    }

    @GetMapping("/onlyFollow/{userEmail}/{pageNo}")
    public ArtworkPageDto getOnlyFollowingArtworkList(@PathVariable("userEmail") String userEmail, @PathVariable("pageNo") int pageNo) {
        return artworkService.getOnlyFollowingArtworksList(userEmail,pageNo);
    }

    @GetMapping("/recommend/{userEmail}")
    public ArtworkPageDto getRecommendArtworks(@PathVariable("userEmail") String userEmail) {
        return artworkService.getRecommandArtworks(userEmail);
    }

    @PostMapping("/genre")
    public List<ArtworkResponseDto> getArtworkInGenre(@RequestBody List<String> genre) {
        return artworkService.getArtworkInGenre(genre);
    }

}
