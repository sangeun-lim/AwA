package com.ssafy.AwA.repository;

import static com.ssafy.AwA.domain.artwork.QArtwork.artwork;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.dto.SearchRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SearchCustomRepositoryImpl implements SearchCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Artwork> findAllSearchByTitle(String keyword, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();
        List<Integer> price = searchRequestDto.getPrice();
        int status = searchRequestDto.getStatus();
//
//        String genre0 = Expressions.stringTemplate()

        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.title.contains(keyword))
//                .where(artwork.genre.)
                .fetch();
    }

    @Override
    public List<Artwork> findAllSearchByWriter(String writer) {
        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.sell_user.nickname.like(writer))
                .fetch();
    }
}
