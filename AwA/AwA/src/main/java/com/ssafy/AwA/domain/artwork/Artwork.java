package com.ssafy.AwA.domain.artwork;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.attachment.Attachment;
import com.ssafy.AwA.domain.chat.Room;
import com.ssafy.AwA.domain.comment.Comment;
import com.ssafy.AwA.domain.report.Report;
import com.ssafy.AwA.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Artwork extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long artwork_id;

    //판매 등록 유저
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sell_user_id")
    private User sell_user;

    @Column(length = 200, nullable = false)
    private String title;

    @Column
    private int view_count;

    @Column
    private int like_count;

    @Column
    private int price;

    //댓글
    @OneToMany(mappedBy = "parent_artwork", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @Column
    private boolean is_sell;

    @OneToOne(fetch = FetchType.LAZY ,mappedBy = "artwork")
    private PurchaseArtwork purchase_artwork;

    @OneToMany(mappedBy = "related_artwork")
    List<Room> rooms = new ArrayList<>();

    @OneToMany(mappedBy = "artwork_id")
    List<Attachment> attachment_list = new ArrayList<>();

    @OneToMany(mappedBy = "reported_artwork")
    List<Report> report_list = new ArrayList<>();
    @Builder
    public Artwork(Long artwork_id, int price, int view_count, int like_count, boolean is_sell) {
        this.artwork_id = artwork_id;
        this.price = price;
        this.view_count = view_count;
        this.like_count = like_count;
        this.is_sell = is_sell;
    }

    //연관관계 메서드
    public void set_Sell_User(User user) {
        this.sell_user = user;
        user.getSell_list().add(this);
    }

    public void addChatRoom(Room room)
    {
        rooms.add(room);
        room.connectArtwork(this);
    }

    public void addAttachement(Attachment attachment) {
        attachment_list.add(attachment);
        attachment.connectArtwork(this);
    }

    public void addReport(Report report)
    {
        report_list.add(report);
        report.createArtwork(this);
    }


    //비즈니스 로직
    public void addLikeCount() {
        this.like_count++;
    }

    public void addViewCount() {
        this.view_count++;
    }

    public void isSell() {
        this.is_sell = !this.is_sell;
    }

}
