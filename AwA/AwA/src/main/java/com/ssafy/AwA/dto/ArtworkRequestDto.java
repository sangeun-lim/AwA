package com.ssafy.AwA.dto;

import com.ssafy.AwA.domain.attachment.Attachment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ArtworkRequestDto {

    private String sell_user_nickname;

    private String title;

    private int price;

    private String description;

    private List<String> genre;

    private String ingredient;

    private List<AttachmentRequestDto> attachmentList;

}
