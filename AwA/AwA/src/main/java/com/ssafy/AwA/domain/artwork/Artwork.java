package com.ssafy.AwA.domain.artwork;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.attachment.Attachment;
import com.ssafy.AwA.domain.comment.Comment;
import com.ssafy.AwA.domain.like.Likes;
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
    @JsonBackReference
    private User sell_user;

    @Column
    private String title;

    @Column
    private int view_count;

    @Column
    private int price;

    @Column(length = 10000)
    private String description;

    @OneToMany(mappedBy = "artwork", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Likes> likes;

    private int like_count;

    @ElementCollection
    @CollectionTable(name = "genre", joinColumns =
        @JoinColumn(name = "artwork_id")
    )
    private List<String> genre = new ArrayList<>();

    private String ingredient;


    //댓글
    @OneToMany(mappedBy = "parent_artwork", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Comment> comments;

    @Column
    private int is_sell;

    @OneToOne(fetch = FetchType.LAZY ,mappedBy = "artwork")
    private PurchaseArtwork purchase_artwork;

//    @OneToMany(mappedBy = "related_artwork")
//    List<Room> rooms = new ArrayList<>();

    @OneToMany(mappedBy = "artwork_id")
    List<Attachment> attachment_list = new ArrayList<>();

    @OneToMany(mappedBy = "reported_artwork",cascade = CascadeType.ALL)
    List<Report> report_list = new ArrayList<>();

    @Builder
    public Artwork(Long artwork_id, User sell_user, String title, int view_count, int price, String description, List<Likes> likes, int like_count, List<String> genre, String ingredient,
                   List<Comment> comments, int is_sell, PurchaseArtwork purchase_artwork, List<Attachment> attachment_list, List<Report> report_list) {
        this.artwork_id = artwork_id;
        this.sell_user = sell_user;
        this.title = title;
        this.view_count = view_count;
        this.price = price;
        this.description = description;
        this.likes = likes;
        this.like_count = like_count;
        this.genre = genre;
        this.ingredient = ingredient;
        this.comments = comments;
        this.is_sell = is_sell;
        this.purchase_artwork = purchase_artwork;
        this.attachment_list = attachment_list;
        this.report_list = report_list;
    }




    //연관관계 메서드
    public void set_Sell_User(User user) {
        this.sell_user = user;
        user.getSell_list().add(this);
    }

//    public void addChatRoom(Room room)
//    {
//        rooms.add(room);
//        room.connectArtwork(this);
//    }

    public void addAttachement(Attachment attachment) {
        attachment_list.add(attachment);
        attachment.connectArtwork(this.artwork_id);
    }


    //비즈니스 로직
    public void addViewCount() {
        this.view_count++;
    }

    public void updateTitle(String newTitle) {
        this.title = newTitle;
    }

    public void updatePrice(int newPrice) {
        this.price = newPrice;
    }

    public void updateDescription(String newDescription) {
        this.description = newDescription;
    }

    public void updateGenre(List<String> genre) {
        this.genre = genre;
    }

    public void updateIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public void updateAttachment(List<Attachment> attachmentList) {
        this.attachment_list = attachmentList;
    }

    public void addLikeCount() {
        this.like_count++;
    }

    public void minusArtwork() {
        this.like_count--;
    }

    public void updateSellStatus(int value) {
        this.is_sell = value;
    }
}
