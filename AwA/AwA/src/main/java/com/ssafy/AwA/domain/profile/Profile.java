package com.ssafy.AwA.domain.profile;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Profile extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profile_id;

    @OneToOne
    @JoinColumn(name = "profileOwner_user_id")
    private User user;

    @Column
    private String profilePictureURL;

    @Column
    private String description;

    @Column
    private String nickname;

    @Builder
    public Profile(User user, String profilePictureURL, String description, String nickname) {
        this.user = user;
        this.profilePictureURL = profilePictureURL;
        this.description = description;
        this.nickname = nickname;
    }

    public void changeDescription(String description) {
        this.description = description;
    }
    public void changeProfilePictureURL(String profilePictureURL) {
        this.profilePictureURL = profilePictureURL;
    }
    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }
}
