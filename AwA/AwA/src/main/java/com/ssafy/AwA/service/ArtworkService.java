package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.attachment.Attachment;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.ArtworkRequestDto;
import com.ssafy.AwA.dto.ArtworkResponseDto;
import com.ssafy.AwA.dto.AttachmentRequestDto;
import com.ssafy.AwA.repository.ArtworkRepository;
import com.ssafy.AwA.repository.AttachmentRepositroy;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ArtworkService {

    private final Logger logger = LoggerFactory.getLogger(ArtworkService.class);
    private final ArtworkRepository artworkRepository;
    private final UserRepository userRepository;
    private final AttachmentRepositroy attachmentRepositroy;
    private final ProfileRepository profileRepository;

    public ArtworkResponseDto saveArtwork(ArtworkRequestDto artworkRequestDto) {
        List<Attachment> attachmentList = new ArrayList<>();

        for(int i=0;i<artworkRequestDto.getAttachmentList().size();i++)
        {
            AttachmentRequestDto attachmentRequestDto = artworkRequestDto.getAttachmentList().get(i);

            attachmentList.add(Attachment.builder()
                    .type(attachmentRequestDto.getType())
                    .url(attachmentRequestDto.getUrl())
                    .build());
        }

        Artwork artwork = Artwork.builder()
                .sell_user(userRepository.findByNickname(artworkRequestDto.getSell_user_nickname()))
                .price(artworkRequestDto.getPrice())
                .title(artworkRequestDto.getTitle())
                .description(artworkRequestDto.getDescription())
                .attachment_list(attachmentList)
                .genre(artworkRequestDto.getGenre())
                .ingredient(artworkRequestDto.getIngredient())
                .build();

        Artwork savedArtwork = artworkRepository.save(artwork);
        logger.info("[saveArtwork] 새로운 Artwork 저장 {}", savedArtwork.getArtwork_id());

        for(int i=0;i<attachmentList.size();i++)
        {
            Attachment attachment = attachmentList.get(i);
            attachmentRepositroy.save(Attachment.builder()
                    .artwork_id(savedArtwork.getArtwork_id())
                    .url(attachment.getUrl())
                    .type(attachment.getType())
                    .build());
        }

        User findByNickname = userRepository.findByNickname(artworkRequestDto.getSell_user_nickname());
        Profile findByNicknameProfile = profileRepository.findByNickname(artworkRequestDto.getSell_user_nickname());
        ArtworkResponseDto artworkResponseDto = ArtworkResponseDto.builder()
                .sell_user_email(findByNickname.getEmail())
                .createdDate(savedArtwork.getCreatedDate())
                .profile_picture(findByNicknameProfile.getProfile_picture_url())
                .description(savedArtwork.getDescription())
                .artwork_id(savedArtwork.getArtwork_id())
                .attachmentRequestDtoList(artworkRequestDto.getAttachmentList())
                .sell_user_nickname(findByNickname.getNickname())
                .title(savedArtwork.getTitle())
                .genre(savedArtwork.getGenre())
                .ingredient(savedArtwork.getIngredient())
                .build();

        return artworkResponseDto;
    }

    public List<ArtworkResponseDto> getAllArtwork() {
        List<Artwork> allArtworks = artworkRepository.findAll();


        List<ArtworkResponseDto> artworkResponseDtoList = new ArrayList<>();

        for(int i=0;i<allArtworks.size();i++) {
            Artwork targetArtwork = allArtworks.get(i);

            User sellUser = targetArtwork.getSell_user();
            Profile sellUserProfile = profileRepository.findByNickname(sellUser.getNickname());

            List<AttachmentRequestDto> attachmentRequestDtoList = new ArrayList<>();
            for (int j = 0; j < targetArtwork.getAttachment_list().size(); j++)
            {       attachmentRequestDtoList.add(AttachmentRequestDto.builder()
                        .type(targetArtwork.getAttachment_list().get(j).getType())
                        .url(targetArtwork.getAttachment_list().get(j).getUrl())
                        .build()
                );
            }

            artworkResponseDtoList.add(ArtworkResponseDto.builder()
                    .sell_user_email(sellUser.getEmail())
                    .profile_picture(sellUserProfile.getProfile_picture_url())
                    .createdDate(targetArtwork.getCreatedDate())
                    .description(targetArtwork.getDescription())
                    .artwork_id(targetArtwork.getArtwork_id())
                    .sell_user_nickname(sellUser.getNickname())
                    .title(targetArtwork.getTitle())
                    .view_count(targetArtwork.getView_count())
                    .price(targetArtwork.getPrice())
                    .genre(targetArtwork.getGenre())
                    .ingredient(targetArtwork.getIngredient())
                    .attachmentRequestDtoList(attachmentRequestDtoList)
                    .build());
        }

        return artworkResponseDtoList;
    }

    public ArtworkResponseDto getArtworkById(Long artwork_id) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);

        targetArtwork.addViewCount(); //조회수 증가

        List<AttachmentRequestDto> attachmentRequestDtoList = new ArrayList<>();
        for(int i=0;i<targetArtwork.getAttachment_list().size();i++) {
            attachmentRequestDtoList.add(AttachmentRequestDto.builder()
                    .type(targetArtwork.getAttachment_list().get(0).getType())
                    .url(targetArtwork.getAttachment_list().get(0).getUrl())
                    .build()
            );
        }
        User targetUser = targetArtwork.getSell_user();
        Profile sellUserProfile = profileRepository.findByNickname(targetUser.getNickname());
        return ArtworkResponseDto.builder()
                .sell_user_email(targetUser.getEmail())
                .profile_picture(sellUserProfile.getProfile_picture_url())
                .artwork_id(artwork_id)
                .createdDate(targetArtwork.getCreatedDate())
                .attachmentRequestDtoList(attachmentRequestDtoList)
                .ingredient(targetArtwork.getIngredient())
                .genre(targetArtwork.getGenre())
                .title(targetArtwork.getTitle())
                .sell_user_nickname(targetUser.getNickname())
                .price(targetArtwork.getPrice())
                .view_count(targetArtwork.getView_count())
                .description(targetArtwork.getDescription())
                .build();
    }

    public ArtworkResponseDto updateTitle(Long artwork_id, String newTitle) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);

        targetArtwork.updateTitle(newTitle);
        return ArtworkResponseDto.builder()
                .title(newTitle)
                .build();
    }

    public void updatePrice(Long artwork_id, int newPrice) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);

        targetArtwork.updatePrice(newPrice);

    }

    public void updateDescription(Long artwork_id, String newDescription) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);

        targetArtwork.updateDescription(newDescription);
    }

    public void updateGenre(Long artwork_id, List<String> genre) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);

        targetArtwork.updateGenre(genre);
    }

    public void updateIngredient(Long artwork_id, String ingredient) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);

        targetArtwork.updateIngredient(ingredient);
    }

    public ArtworkResponseDto updateArtwork(Long artwork_id, ArtworkRequestDto artworkRequestDto) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);
        User targetUser = userRepository.findByNickname(artworkRequestDto.getSell_user_nickname());

        targetArtwork.updateDescription(artworkRequestDto.getDescription());
        targetArtwork.updateGenre(artworkRequestDto.getGenre());
        targetArtwork.updateIngredient(artworkRequestDto.getIngredient());
        targetArtwork.updateTitle(artworkRequestDto.getTitle());
        targetArtwork.updatePrice(artworkRequestDto.getPrice());

        ArtworkResponseDto artworkResponseDto = ArtworkResponseDto.builder()
                .view_count(targetArtwork.getView_count())
                .like_count(targetArtwork.getLike_count().size())
                .artwork_id(artwork_id)
                .createdDate(targetArtwork.getCreatedDate())
                .attachmentRequestDtoList(artworkRequestDto.getAttachmentList())
                .description(artworkRequestDto.getDescription())
                .ingredient(artworkRequestDto.getIngredient())
                .genre(artworkRequestDto.getGenre())
                .price(artworkRequestDto.getPrice())
                .sell_user_nickname(targetUser.getNickname())
                .build();
        return artworkResponseDto;
    }

    public int deleteArtwork(Long artwork_id) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);
        artworkRepository.delete(targetArtwork);
        return 1;
    }
}
