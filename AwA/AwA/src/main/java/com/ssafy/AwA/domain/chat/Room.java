package com.ssafy.AwA.domain.chat;


import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Room extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long room_id;

    //게시물 번호 외래키

    //채팅방 생성 유저
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User create_room_user;

    //채팅 상대 유저
    private int chat_partner_id;

    //채팅 내역
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Message> chat_log = new ArrayList<>();



}
