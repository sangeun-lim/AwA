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
    @ManyToOne(cascade = CascadeType.ALL)
    private Profile fromProfile;

    @JoinColumn(name = "to_profile_id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Profile toProfile;

    @Builder
    public Follow(Profile fromProfile, Profile toProfile) {
        this.fromProfile = fromProfile;
        this.toProfile = toProfile;
    }
}