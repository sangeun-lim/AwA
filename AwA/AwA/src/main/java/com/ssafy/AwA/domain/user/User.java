package com.ssafy.AwA.domain.user;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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
import java.util.*;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@ToString(of = {"user_id", "nickname", "email", "password", "birth", "gender"})
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

    @Column
    private boolean gender;

    @Column
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate birth;


    @OneToOne(mappedBy = "owner_user",cascade = CascadeType.ALL)

    private Profile profile;
    @Column
    private String refreshToken;

    @Column
    private boolean is_manager;

    @Column
    private boolean is_seller;

    @OneToMany(mappedBy = "sell_user",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Artwork> sell_list = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
//    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    private List<Long> recommandArtworks = new ArrayList<>();

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
    public User(String email, String password, String nickname, boolean gender, LocalDate birth, List<String> roles,
                Profile profile, boolean is_manager, boolean is_seller, List<Long> recommandArtworks) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.birth = birth;
        this.roles = roles;
        this.profile = profile;
        this.is_manager = is_manager;
        this.is_seller = is_seller;
        this.recommandArtworks = recommandArtworks;
    }
    //비즈니스로직

    //닉네임 수정
    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    //토큰 발급
    public void giveToken(String refreshToken) {this.refreshToken = refreshToken; }

    public void createProfile(Profile profile) {this.profile = profile;}

    public void changeRecommandList(List<Long> userRecommandList) {
        this.recommandArtworks = userRecommandList;
    }
}
