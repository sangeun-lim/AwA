package com.ssafy.AwA.domain.profile;

import com.ssafy.AwA.domain.BaseTimeEntity;
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

    @Column(length = 20, nullable = false)
    private String nickname;

    @Column(length = 100)
    private String description;

    //팔로워리스트
    //팔로잉리스트
    //선호분야
    //구매리스트


   @Builder
    public Profile(String nickname, String description) {
        this.nickname = nickname;
        this. description = description;
    }
}
