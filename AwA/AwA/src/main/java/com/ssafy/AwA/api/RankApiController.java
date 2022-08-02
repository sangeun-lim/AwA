package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.ArtworkResponseDto;
import com.ssafy.AwA.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rank")
public class RankApiController {

    private final RankService rankService;

    @GetMapping("/like")
    public List<ArtworkResponseDto> likeTop10ArtworkList() {
        return rankService.getLikeTop10ArtworkList();
    }
}
