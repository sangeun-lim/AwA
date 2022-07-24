package com.ssafy.AwA.domain.user;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.artwork.PurchaseArtwork;
import com.ssafy.AwA.domain.chat.Room;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"user_id", "nickname", "email", "password"})
@Entity
public class User extends BaseTimeEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @NotEmpty
    @Column(length = 50, nullable = false, unique = true)
    private String email;

    @NotEmpty
    @Column(length=20, nullable = false)
    private String password;

    @NotEmpty
    @Column(length = 20, nullable = false, unique = true)
    private String nickname;

    @Column
    private int gender;

    @Column
    private int age;

//    @Column
//    private boolean is_seller;

    @Column
    private boolean is_manager;

    @Column(length = 500)
    private String description;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User userFollowing = this;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User userFollower = this;

    //나를 팔로잉 하는 사람들
    @OneToMany(mappedBy = "userFollowing")
    private List<User> following_list = new ArrayList<User>();

    //나를 팔로우 하는 사람들
    @OneToMany(mappedBy = "userFollower")
    private List<User> follower_list = new ArrayList<User>();

    //선호분야리스트
    @OneToMany(mappedBy = "select_user", cascade = CascadeType.ALL)
    private List<FavoriteField> favorite_list = new ArrayList<>();

    @OneToMany(mappedBy = "create_room_user", cascade = CascadeType.ALL)
    private List<Room> chatrooms = new ArrayList<>();

    @OneToMany(mappedBy = "purchase_user", cascade = CascadeType.ALL)
    private List<PurchaseArtwork> purchase_list = new ArrayList<>();

    @OneToMany(mappedBy = "sell_user",cascade = CascadeType.ALL)
    private List<Artwork> sell_list = new ArrayList<>();

    @Builder
    public User(String email, String password, String nickname, int gender, int age, boolean is_manager, String description) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.age = age;
        this.is_manager = is_manager;
        this.description = description;
    }


    //비즈니스로직

    //닉네임 수정
    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    //자기소개 수정
    public void changeDescription(String description) { this.description = description; }
    //팔로우관련
    public void addFollowing(User following) {
        this.following_list.add(following); //나를 팔로잉 하는 사람 추가

        if(!following.getFollower_list().contains(this)) { //새롭게 나를 팔로잉 한 사람의 팔로워 리스트에서 내가 있는지 확인
            following.getFollowing_list().add(this); //없으면 넣기
        }

        //연간관계 주인을 통한 확인
        if(!following.getUserFollower().getFollowing_list().contains(this)) { //나를 팔로잉 하는 사람의 팔로워 리스트를 받아와 내가 있느지 확인
            following.getUserFollower().getFollower_list().add(this); //없으면 넣어주기..?
        }
    }

    //위에거 안되면 김영한씨 강의보고 참조
//    public void setParentUser(User parent)
//    {
//
//    }
//    public void addFollowing(User follower)
//    {
//        this.following_list.add(follower);
//        follower.
//    }
}
