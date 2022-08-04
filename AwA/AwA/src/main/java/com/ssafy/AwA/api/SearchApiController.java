package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.ArtworkResponseDto;
import com.ssafy.AwA.dto.SearchRequestDto;
import com.ssafy.AwA.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchApiController {

    private final SearchService searchService;

    @GetMapping("title/{title}")
    public List<ArtworkResponseDto> getSearchByTitle(@PathVariable("title") String title, @RequestBody @Valid SearchRequestDto searchRequestDto) {
        return searchService.getSearchByTitle(title, searchRequestDto);
    }

    @GetMapping("writer/{nickname}")
    public List<ArtworkResponseDto> getSearchByWriter(@PathVariable("nickname") String writer) {
        return searchService.getSearchByWriter(writer);
    }
}
