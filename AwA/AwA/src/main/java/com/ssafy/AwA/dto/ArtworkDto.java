package com.ssafy.AwA.dto;

import com.ssafy.AwA.domain.attachment.Attachment;
import com.ssafy.AwA.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ArtworkDto {

    private String sell_user;

    private String title;

    private int price;

}
