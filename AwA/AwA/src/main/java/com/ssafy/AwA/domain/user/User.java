package com.ssafy.AwA.domain.user;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.artwork.PurchaseArtwork;
import com.ssafy.AwA.domain.chat.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.digester.ArrayStack;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

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

    @Column
    private boolean is_manager;

    @Column(length = 500)
    private String description;


    @ManyToOne
    @JoinColumn
    private User userFollowing = this;

    @ManyToOne
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
    private List<FavoriteField> favortie_list = new ArrayList<>();

    @OneToMany(mappedBy = "create_room_user", cascade = CascadeType.ALL)
    private List<Room> chatrooms = new ArrayList<>();

    @OneToMany(mappedBy = "purchase_user", cascade = CascadeType.ALL)
    private List<PurchaseArtwork> purchase_list = new ArrayList<>();

    @OneToMany(mappedBy = "sell_user",cascade = CascadeType.ALL)
    private List<Artwork> sell_list = new ArrayList<>();

    @Builder
    public User(Long user_id, String email, String password, String nickname, int gender, LocalDateTime birth_date, boolean is_seller, boolean is_manager, String description) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.birth_date = birth_date;
        this.is_seller = is_seller;
        this.is_manager = is_manager;
        this.description = description;
    }


    //비즈니스로직

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


}
