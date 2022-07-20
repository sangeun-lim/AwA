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

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "artwork_id")
    private Artwork artwork_id;

    @Column(length = 50, nullable = false)
    private String type;

    @Column(length = 200, nullable = false)
    private String name;

    @Builder
    public Attachment(Long file_id, String type, String name) {
        this.file_id = file_id;
        this.type = type;
        this.name = name;
    }
}
