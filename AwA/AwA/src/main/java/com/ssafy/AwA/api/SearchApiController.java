package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.ArtworkResponseDto;
import com.ssafy.AwA.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchApiController {

    private final SearchService searchService;

    @GetMapping("title/{title}")
    public List<ArtworkResponseDto> getSearchByTitle(@PathVariable("title") String title) {
        return searchService.getSearchByTitle(title);
    }

    @GetMapping("writer/{nickname}")
    public List<ArtworkResponseDto> getSearchByWriter(@PathVariable("nickname") String writer) {
        return searchService.getSearchByWriter(writer);
    }
}
