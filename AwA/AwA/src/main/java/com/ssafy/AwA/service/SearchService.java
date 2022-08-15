package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.ArtworkResponseDto;
import com.ssafy.AwA.dto.AttachmentRequestDto;
import com.ssafy.AwA.dto.SearchRequestDto;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.repository.SearchCustomRepositoryImpl;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {

    private final SearchCustomRepositoryImpl searchCustomRepository;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    public List<ArtworkResponseDto> getSearchByTitle(String title, @RequestBody @Valid SearchRequestDto searchRequestDto) {
        List<Artwork> allSearchByTitle = new ArrayList<>();
        if(searchRequestDto.getGenre_count()==0)
            allSearchByTitle = searchCustomRepository.findAllSearchByTitle(title,searchRequestDto);
        else if(searchRequestDto.getGenre_count() == 1)
            allSearchByTitle = searchCustomRepository.findAllSearchByTitle1(title, searchRequestDto);
        else if(searchRequestDto.getGenre_count() == 2)
            allSearchByTitle = searchCustomRepository.findAllSearchByTitle2(title, searchRequestDto);
        else if(searchRequestDto.getGenre_count() == 3)
            allSearchByTitle = searchCustomRepository.findAllSearchByTitle3(title, searchRequestDto);
        else if(searchRequestDto.getGenre_count() == 4)
            allSearchByTitle = searchCustomRepository.findAllSearchByTitle4(title, searchRequestDto);
        else if (searchRequestDto.getGenre_count() == 5)
            allSearchByTitle = searchCustomRepository.findAllSearchByTitle5(title, searchRequestDto);

        List<ArtworkResponseDto> artworkResponseDtos = new ArrayList<>();
        for(int i=0;i<allSearchByTitle.size();i++) {
            Artwork targetArtwork = allSearchByTitle.get(i);
            User targetUser = targetArtwork.getSell_user();
            Profile targetProfile = profileRepository.findByNickname(targetUser.getNickname());


            List<AttachmentRequestDto> attachmentRequestDtoList = new ArrayList<>();

            for (int j = 0; j < targetArtwork.getAttachment_list().size(); j++) {
                attachmentRequestDtoList.add(AttachmentRequestDto.builder()
                        .type(targetArtwork.getAttachment_list().get(j).getType())
                        .url(targetArtwork.getAttachment_list().get(j).getUrl())
                        .build());
            }

            ArtworkResponseDto artworkResponseDto = ArtworkResponseDto.builder()
                    .sell_user_email(targetUser.getEmail())
                    .profile_picture(targetProfile.getProfile_picture_url())
                    .createdDate(targetArtwork.getCreatedDate())
                    .description(targetArtwork.getDescription())
                    .artwork_id(targetArtwork.getArtwork_id())
                    .sell_user_nickname(targetUser.getNickname())
                    .title(targetArtwork.getTitle())
                    .view_count(targetArtwork.getView_count())
                    .price(targetArtwork.getPrice())
                    .genre(targetArtwork.getGenre())
                    .ingredient(targetArtwork.getIngredient())
                    .attachmentRequestDtoList(attachmentRequestDtoList)
                    .is_sell(targetArtwork.getIs_sell())
                    .build();

            artworkResponseDtos.add(artworkResponseDto);
        }
        return artworkResponseDtos;
    }

    public List<ArtworkResponseDto> getSearchByWriter(String writer, @RequestBody @Valid SearchRequestDto searchRequestDto) {
        List<Artwork> allSearchByWriter = new ArrayList<>();
        if(searchRequestDto.getGenre_count()==0)
            allSearchByWriter = searchCustomRepository.findAllSearchByWriter(writer,searchRequestDto);
        else if(searchRequestDto.getGenre_count() == 1)
            allSearchByWriter = searchCustomRepository.findAllSearchByWriter1(writer,searchRequestDto);
        else if(searchRequestDto.getGenre_count() == 2)
            allSearchByWriter = searchCustomRepository.findAllSearchByWriter2(writer, searchRequestDto);
        else if(searchRequestDto.getGenre_count() == 3)
            allSearchByWriter = searchCustomRepository.findAllSearchByWriter3(writer, searchRequestDto);
        else if(searchRequestDto.getGenre_count() == 4)
            allSearchByWriter = searchCustomRepository.findAllSearchByWriter4(writer, searchRequestDto);
        else if (searchRequestDto.getGenre_count() == 5)
            allSearchByWriter = searchCustomRepository.findAllSearchByWriter5(writer, searchRequestDto);

        List<ArtworkResponseDto> artworkResponseDtos = new ArrayList<>();
        for(int i=0;i<allSearchByWriter.size();i++) {
            Artwork targetArtwork = allSearchByWriter.get(i);
            User targetUser = targetArtwork.getSell_user();
            Profile targetProfile = profileRepository.findByNickname(targetUser.getNickname());


            List<AttachmentRequestDto> attachmentRequestDtoList = new ArrayList<>();

            for (int j = 0; j < targetArtwork.getAttachment_list().size(); j++) {
                attachmentRequestDtoList.add(AttachmentRequestDto.builder()
                        .type(targetArtwork.getAttachment_list().get(j).getType())
                        .url(targetArtwork.getAttachment_list().get(j).getUrl())
                        .build());
            }

            ArtworkResponseDto artworkResponseDto = ArtworkResponseDto.builder()
                    .sell_user_email(targetUser.getEmail())
                    .profile_picture(targetProfile.getProfile_picture_url())
                    .createdDate(targetArtwork.getCreatedDate())
                    .description(targetArtwork.getDescription())
                    .artwork_id(targetArtwork.getArtwork_id())
                    .sell_user_nickname(targetUser.getNickname())
                    .title(targetArtwork.getTitle())
                    .view_count(targetArtwork.getView_count())
                    .price(targetArtwork.getPrice())
                    .genre(targetArtwork.getGenre())
                    .ingredient(targetArtwork.getIngredient())
                    .attachmentRequestDtoList(attachmentRequestDtoList)
                    .is_sell(targetArtwork.getIs_sell())
                    .build();

            artworkResponseDtos.add(artworkResponseDto);
        }
        return artworkResponseDtos;
    }
}
