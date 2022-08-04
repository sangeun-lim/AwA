package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.artwork.Artwork;

import java.util.List;

public interface SearchCustomRepository {

    List<Artwork> findAllSearchByTitle(String keyword);

    List<Artwork> findAllSearchByWriter(String writer);
}
