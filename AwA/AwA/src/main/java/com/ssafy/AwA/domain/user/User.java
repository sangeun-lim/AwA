package com.ssafy.AwA.domain.user;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.artwork.PurchaseArtwork;
import com.ssafy.AwA.domain.chat.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    //팔로워리스트
    @ManyToOne
    @JoinColumn(name = "follower_parent_id")
    private User follower_parent;

    @OneToMany(mappedBy = "follower_parent")
    private List<User> follower_list = new ArrayList<>();

    //팔로잉리스트
    @ManyToOne
    @JoinColumn(name = "following_parent_id")
    private User following_parent;

    @OneToMany(mappedBy = "following_parent")
    private List<User> following_list = new ArrayList<>();

    //선호분야리스트

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



}
