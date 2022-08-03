package com.ssafy.AwA.domain.profile;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.report.Report;
import com.ssafy.AwA.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
@Entity
public class Profile extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profile_id;

    @Column
    private String profile_picture_url;

    @Column
    private String nickname;

    @Column
    private String description;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User owner_user;

//    @OneToOne(mappedBy = "report_profile")
//    private Report report;

    @ElementCollection
    @CollectionTable(name = "favorite_field", joinColumns =
    @JoinColumn(name = "profile_id")
    )
    private List<String> favorite_field = new ArrayList<>();


    //판매목록

    @Builder
    public Profile(String profile_picture_url, String nickname, String description, User owner_user) {
        this.profile_picture_url = profile_picture_url;
        this.nickname = nickname;
        this.description = description;
        this.owner_user = owner_user;
    }

    public void updateNickname(String newNickname) {
        this.nickname = newNickname;
    }

    public void updatePictureURL(String newURL) {
        this.profile_picture_url = newURL;
    }

    public void updateDescription(String newDescription) {
        this.description = newDescription;
    }

    public void updateFavorite_field(List<String> favorite_field) {
        this.favorite_field = favorite_field;
    }
}
