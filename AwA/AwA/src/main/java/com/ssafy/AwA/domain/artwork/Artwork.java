package com.ssafy.AwA.domain.artwork;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.attachment.Attachment;
import com.ssafy.AwA.domain.comment.Comment;
import com.ssafy.AwA.domain.like.Likes;
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

    @Column(length = 200, nullable = false)
    private String title;

    @Column
    private int view_count;

    @Column
    private int price;

    @Column
    private String description;

    @OneToMany(mappedBy = "artwork")
    @JsonManagedReference
    List<Likes> like_count;

    @ElementCollection
    @CollectionTable(name = "genre", joinColumns =
        @JoinColumn(name = "artwork_id")
    )
    private List<String> genre = new ArrayList<>();

    private String ingredient;


    //댓글
    @OneToMany(mappedBy = "parent_artwork", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @Column
    private boolean is_sell;

    @OneToOne(fetch = FetchType.LAZY ,mappedBy = "artwork")
    private PurchaseArtwork purchase_artwork;

//    @OneToMany(mappedBy = "related_artwork")
//    List<Room> rooms = new ArrayList<>();

    @OneToMany(mappedBy = "artwork_id")
    List<Attachment> attachment_list = new ArrayList<>();

//    @OneToMany(mappedBy = "reported_artwork")
//    List<Report> report_list = new ArrayList<>();


    @Builder
    public Artwork(User sell_user, String title, int view_count, int price, String description, boolean is_sell, List<String> genre, String ingredient, List<Attachment> attachment_list) {
        this.sell_user = sell_user;
        this.title = title;
        this.view_count = view_count;
        this.price = price;
        this.description = description;
        this.is_sell = is_sell;
        this.genre = genre;
        this.ingredient = ingredient;
        this.attachment_list = attachment_list;
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

    public void isSell() {
        this.is_sell = !this.is_sell;
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
}
