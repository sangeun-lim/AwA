package com.ssafy.AwA.domain.user;

import com.ssafy.AwA.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    //프로필번호

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length=20, nullable = false)
    private String password;

    @Column(length = 20, nullable = false)
    private String nickname;

    @Column
    private int gender;

    @Column
    private LocalDateTime birth_date;

    @Column
    private boolean is_seller;

    @Column boolean is_manager;

    @Builder
    public User(Long user_id, String email, String password, String nickname, int gender, LocalDateTime birth_date, boolean is_seller, boolean is_manager) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.birth_date = birth_date;
        this.is_seller = is_seller;
        this.is_manager = is_manager;
    }
}
