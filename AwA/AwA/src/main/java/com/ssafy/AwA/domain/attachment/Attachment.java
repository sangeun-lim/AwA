package com.ssafy.AwA.domain.attachment;

import com.ssafy.AwA.domain.BaseTimeEntity;
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

    //게시물번호

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
