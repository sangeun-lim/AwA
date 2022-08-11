package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.dto.SearchRequestDto;

import java.util.List;

public interface SearchCustomRepository {

    List<Artwork> findAllSearchByTitle(String keyword, SearchRequestDto searchRequestDto);
    List<Artwork> findAllSearchByTitle1(String keyword, SearchRequestDto searchRequestDto);
    List<Artwork> findAllSearchByTitle2(String keyword, SearchRequestDto searchRequestDto);
    List<Artwork> findAllSearchByTitle3(String keyword, SearchRequestDto searchRequestDto);
    List<Artwork> findAllSearchByTitle4(String keyword, SearchRequestDto searchRequestDto);
    List<Artwork> findAllSearchByTitle5(String keyword, SearchRequestDto searchRequestDto);


    List<Artwork> findAllSearchByWriter1(String writer, SearchRequestDto searchRequestDto);
    List<Artwork> findAllSearchByWriter2(String writer, SearchRequestDto searchRequestDto);
    List<Artwork> findAllSearchByWriter3(String writer, SearchRequestDto searchRequestDto);
    List<Artwork> findAllSearchByWriter4(String writer, SearchRequestDto searchRequestDto);
    List<Artwork> findAllSearchByWriter5(String writer, SearchRequestDto searchRequestDto);
}
