package com.ssafy.AwA.domain.attachment;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.artwork.Artwork;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Attachment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long file_id;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "artwork_id")
    @Column
    private Long artwork_id;

    @Column
    private String type;

    @Column
    private String url;

    @Builder
    public Attachment(Long artwork_id, String type, String url) {
        this.artwork_id = artwork_id;
        this.type = type;
        this.url = url;
    }

    //연관관계 메서드
    public void connectArtwork(Long artwork) {
        this.artwork_id = artwork;
    }
}
