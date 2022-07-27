package com.ssafy.AwA.domain.user;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.artwork.PurchaseArtwork;
import com.ssafy.AwA.domain.chat.Room;
import com.ssafy.AwA.domain.profile.Profile;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"user_id", "nickname", "email", "password", "birth", "gender"})
@Entity
public class User extends BaseTimeEntity implements UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @NotEmpty
    @Column(length = 50, nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) //JSON 결과로 출력하지 않을데이터에 대해 설정 비밀번호는 유출되면 안되니까
    @NotEmpty
    @Column(nullable = false)
    private String password;

    @NotEmpty
    @Column(length = 20, nullable = false, unique = true)
    private String nickname;

    @OneToOne(mappedBy = "user")
    private Profile profile;

    @Column
    private boolean gender;

    @Column
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate birth;

    @Column
    private String accessToken;

    //선호분야리스트
    @OneToMany(mappedBy = "select_user", cascade = CascadeType.ALL)
    private List<FavoriteField> favorite_list = new ArrayList<>();

    @OneToMany(mappedBy = "create_room_user", cascade = CascadeType.ALL)
    private List<Room> chatrooms = new ArrayList<>();

    @OneToMany(mappedBy = "purchase_user", cascade = CascadeType.ALL)
    private List<PurchaseArtwork> purchase_list = new ArrayList<>();

    @OneToMany(mappedBy = "sell_user",cascade = CascadeType.ALL)
    private List<Artwork> sell_list = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
//    @Builder.Default
    private List<String> roles = new ArrayList<>();

    //계정이 가지고 있는 권한 목록 리턴
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    //계정의 ID 리턴
    @JsonProperty(access =  JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.email;
    }

    //계정이 만료됐는지 리턴
    @JsonProperty(access =  JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //계정이 잠겨있는지 리턴
    @JsonProperty(access =  JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //비밀번호가 만료됐는지 리턴
    @JsonProperty(access =  JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //계정이 활성화돼 있는지 리턴
    @JsonProperty(access =  JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Builder
    public User(String email, String password, String nickname, boolean gender, int age, LocalDate birth, List<String> roles) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.birth = birth;
        this.roles = roles;
    }


    //비즈니스로직

    //닉네임 수정
    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    //토큰 발급
    public void giveToken(String accessToken) {this.accessToken = accessToken; }
    //팔로우관련
//    public void addFollowing(User following) {
//        this.following_list.add(following); //나를 팔로잉 하는 사람 추가
//
//        if(!following.getFollower_list().contains(this)) { //새롭게 나를 팔로잉 한 사람의 팔로워 리스트에서 내가 있는지 확인
//            following.getFollowing_list().add(this); //없으면 넣기
//        }
//
//        //연간관계 주인을 통한 확인
//        if(!following.getUserFollower().getFollowing_list().contains(this)) { //나를 팔로잉 하는 사람의 팔로워 리스트를 받아와 내가 있느지 확인
//            following.getUserFollower().getFollower_list().add(this); //없으면 넣어주기..?
//        }
//    }

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
