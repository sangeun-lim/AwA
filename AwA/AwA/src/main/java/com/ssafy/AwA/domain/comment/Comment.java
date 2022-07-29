package com.ssafy.AwA.domain.comment;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long comment_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_artwork")
    private Artwork parent_artwork;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_profile_id")
    private Profile profile;

    private String content;

    @Builder
    public Comment(Long comment_id, Artwork parent_artwork, Profile profile, String content) {
        this.comment_id = comment_id;
        this.parent_artwork = parent_artwork;
        this.profile = profile;
        this.content = content;
    }
}
