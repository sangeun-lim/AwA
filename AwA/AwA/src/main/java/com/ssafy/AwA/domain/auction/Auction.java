package com.ssafy.AwA.domain.auction;

import com.ssafy.AwA.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Auction extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long artwork_id;

    //기본정보
    //상세정보

    @Column
    private int price;

    @Column
    private int view_count;

    @Column
    private int like_count;

    @Column
    private boolean is_sell;

    //댓글

    @Builder
    public Auction(Long artwork_id, int price, int view_count, int like_count, boolean is_sell) {
        this.artwork_id = artwork_id;
        this.price = price;
        this.view_count = view_count;
        this.like_count = like_count;
        this.is_sell = is_sell;
    }
}
