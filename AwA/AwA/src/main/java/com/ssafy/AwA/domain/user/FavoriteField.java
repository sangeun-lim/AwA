package com.ssafy.AwA.domain.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Getter
@NoArgsConstructor
@Entity
public class FavoriteField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoritefield_id;

    @Column(length = 15)
    private String field;

    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User select_user;


}
