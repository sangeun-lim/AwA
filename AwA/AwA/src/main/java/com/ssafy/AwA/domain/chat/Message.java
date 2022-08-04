package com.ssafy.AwA.domain.chat;

import com.ssafy.AwA.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Message extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long message_id;

    //채팅방
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id")
    private Room room;


    @Column(length = 500,nullable = false)
    private String content;

    @Builder
    public Message(Long message_id, String content) {
        this.message_id = message_id;
        this.content = content;
    }
}
