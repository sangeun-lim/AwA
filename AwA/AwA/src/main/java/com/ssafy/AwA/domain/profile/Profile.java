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
    private Long no;

    @Column(length = 15, nullable = false)
    private String nickname;

    @Column(length = 50)
    private String description;


    @Builder
    public Profile(String nickname, String description) {
        this.nickname = nickname;
        this. description = description;
    }
}
