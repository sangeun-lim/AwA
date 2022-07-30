package com.ssafy.AwA.domain.report;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.AwA.domain.BaseTimeEntity;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Report extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long report_id;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_artwork")
    private Artwork reported_artwork;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "report_profile_id")
    private Profile report_profile;


    @Builder
    public Report(Long report_id, String category, String content, Artwork reported_artwork, Profile profile) {
        this.report_id = report_id;
        this.category = category;
        this.content = content;
        this.reported_artwork = reported_artwork;
        this.report_profile = profile;
    }
}
