package com.ssafy.AwA.domain.follow;

import com.ssafy.AwA.domain.user.User;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "from_user_id")
    @ManyToOne
    private User fromUser; //팔로우하는 유저

    @JoinColumn(name = "to_user_id")
    @ManyToOne
    private User toUser; //팔로우 당하는 유저

    @Builder
    public Follow(User fromUser, User toUser) {
        this.fromUser = fromUser;
        this.toUser = toUser;
    }
}