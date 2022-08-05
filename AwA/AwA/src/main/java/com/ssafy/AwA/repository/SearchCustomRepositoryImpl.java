package com.ssafy.AwA.repository;

import static com.ssafy.AwA.domain.artwork.QArtwork.artwork;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.artwork.QArtwork;
import com.ssafy.AwA.dto.SearchRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class SearchCustomRepositoryImpl implements SearchCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<Artwork> findAllSearchByTitle1(String keyword, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();
        int status = searchRequestDto.getStatus();

        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.title.contains(keyword)
                        .and(artwork.genre.contains(genre.get(0)))
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price()))
                )
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }

    @Override
    public List<Artwork> findAllSearchByTitle2(String keyword, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();
        int status = searchRequestDto.getStatus();

        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.title.contains(keyword)
                        .and((artwork.genre.contains(genre.get(0))
                                .or(artwork.genre.contains(genre.get(1))))
                        )
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price()))
                )
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }

    @Override
    public List<Artwork> findAllSearchByTitle3(String keyword, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();
        int status = searchRequestDto.getStatus();

        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.title.contains(keyword)
                        .and(artwork.genre.contains(genre.get(0))
                                .or(artwork.genre.contains(genre.get(1)))
                                .or(artwork.genre.contains(genre.get(2)))
                        )
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price()))
                )
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }

    @Override
    public List<Artwork> findAllSearchByTitle4(String keyword, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();

        int status = searchRequestDto.getStatus();

        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.title.contains(keyword)
                        .and(artwork.genre.contains(genre.get(0))
                                .or(artwork.genre.contains(genre.get(1)))
                                .or(artwork.genre.contains(genre.get(2)))
                                .or(artwork.genre.contains(genre.get(3)))
                        )
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price()))
                )
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }

    @Override
    public List<Artwork> findAllSearchByTitle5(String keyword, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();

        int status = searchRequestDto.getStatus();

        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.title.contains(keyword)
                        .and(artwork.genre.contains(genre.get(0))
                                .or(artwork.genre.contains(genre.get(1)))
                                .or(artwork.genre.contains(genre.get(2)))
                                .or(artwork.genre.contains(genre.get(3)))
                                .or(artwork.genre.contains(genre.get(4)))
                        )
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price()))
                )
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }

    @Override
    public List<Artwork> findAllSearchByWriter1(String writer, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();
        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.sell_user.nickname.like(writer)
                        .and(artwork.genre.contains(genre.get(0)))
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price())))
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }

    @Override
    public List<Artwork> findAllSearchByWriter2(String writer, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();
        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.sell_user.nickname.like(writer)
                        .and(artwork.genre.contains(genre.get(0))
                                .or(artwork.genre.contains(genre.get(1))))
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price())))
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }
    @Override
    public List<Artwork> findAllSearchByWriter3(String writer, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();
        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.sell_user.nickname.like(writer)
                        .and(artwork.genre.contains(genre.get(0))
                                .or(artwork.genre.contains(genre.get(1)))
                                .or(artwork.genre.contains(genre.get(2))))
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price()))
                )
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }
    @Override
    public List<Artwork> findAllSearchByWriter4(String writer, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();
        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.sell_user.nickname.like(writer)
                        .and(artwork.genre.contains(genre.get(0))
                                .or(artwork.genre.contains(genre.get(1)))
                                .or(artwork.genre.contains(genre.get(2)))
                                .or(artwork.genre.contains(genre.get(3))))
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price()))
                )
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }
    @Override
    public List<Artwork> findAllSearchByWriter5(String writer, SearchRequestDto searchRequestDto) {
        List<String> genre = searchRequestDto.getGenre();
        return jpaQueryFactory.selectFrom(artwork)
                .where(artwork.sell_user.nickname.like(writer)
                        .and(artwork.genre.contains(genre.get(0))
                                .or(artwork.genre.contains(genre.get(1)))
                                .or(artwork.genre.contains(genre.get(2)))
                                .or(artwork.genre.contains(genre.get(3)))
                                .or(artwork.genre.contains(genre.get(4))))
                        .and(artwork.price.between(searchRequestDto.getMin_price(), searchRequestDto.getMax_price()))
                )
                .orderBy(artwork.artwork_id.desc())
                .fetch();
    }

}
