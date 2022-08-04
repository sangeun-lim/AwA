package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.dto.SearchRequestDto;

import java.util.List;

public interface SearchCustomRepository {

    List<Artwork> findAllSearchByTitle(String keyword, SearchRequestDto searchRequestDto);

    List<Artwork> findAllSearchByWriter(String writer);
}
