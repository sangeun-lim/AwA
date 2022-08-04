package com.ssafy.AwA.domain.artwork;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@NoArgsConstructor
@Entity
public class PurchaseArtwork extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchase_id;

    //구매 유저 번호
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "purchase_user_id")
    private User purchase_user;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "artwork_id")
    private Artwork artwork;
}
