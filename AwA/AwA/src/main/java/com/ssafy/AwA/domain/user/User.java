package com.ssafy.AwA.domain.user;

import com.ssafy.AwA.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length = 15, nullable = false)
    private String nickname;

    @Column(length = 10, nullable = false)
    private String gender;

    @Builder
    public User(String email, String nickname, String gender){
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
    }
}
