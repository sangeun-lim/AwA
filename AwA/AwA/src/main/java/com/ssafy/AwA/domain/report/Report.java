package com.ssafy.AwA.domain.report;

import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.artwork.Artwork;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Report extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long report_id;

    @Column(length = 20, nullable = false)
    private String category;

    @Column(length = 1000, nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_artwork")
    private Artwork reported_artwork;

    @Builder
    public Report(Long report_id, String category, String content) {
        this.report_id = report_id;
        this.category = category;
        this.content = content;
    }
}
