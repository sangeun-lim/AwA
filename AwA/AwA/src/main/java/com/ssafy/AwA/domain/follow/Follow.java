package com.ssafy.AwA.domain.follow;

import com.ssafy.AwA.domain.profile.Profile;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long follow_id;

    @JoinColumn(name = "from_profile_id")
    @ManyToOne
    private Profile fromProfile; //팔로우하는 유저

    @JoinColumn(name = "to_profile_id")
    @ManyToOne
    private Profile toProfile; //팔로우 당하는 유저

    @Builder
    public Follow(Profile fromProfile, Profile toProfile) {
        this.fromProfile = fromProfile;
        this.toProfile = toProfile;
    }
}