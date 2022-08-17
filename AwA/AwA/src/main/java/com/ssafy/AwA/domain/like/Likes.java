package com.ssafy.AwA.domain.like;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long like_id;

    @ManyToOne
    @JoinColumn(name = "artwork_id")
    @JsonBackReference
    private Artwork artwork;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @Builder
    public Likes(Long like_id, Artwork artwork, Profile profile) {
        this.like_id = like_id;
        this.artwork = artwork;
        this.profile = profile;
    }
}
