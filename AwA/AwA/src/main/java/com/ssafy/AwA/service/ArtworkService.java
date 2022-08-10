package com.ssafy.AwA.service;

import com.ssafy.AwA.config.security.JwtTokenProvider;
import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.attachment.Attachment;
import com.ssafy.AwA.domain.comment.Comment;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.*;
import com.ssafy.AwA.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
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
    private final FollowRepository followRepository;
    private final CommentRepository commentRepository;
    private final JwtTokenProvider jwtTokenProvider;

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
                .is_sell(savedArtwork.getIs_sell())
                .build();

        return artworkResponseDto;
    }

    public List<ArtworkResponseDto> getAllArtwork() {
        List<Artwork> allArtworks = artworkRepository.findAllByOrderByArtwork_idDesc();
//        PageRequest page = PageRequest.of(1, 3, Sort.by(Sort.Direction.DESC, "artwork_id"));
//        Page<Artwork> allArtworksPage = artworkRepository.findAll(page);
//
//        List<Artwork> allArtworks = allArtworksPage.getContent();
//        System.out.println(allArtworksPage.getTotalElements() + "총 개수");
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
                    .is_sell(targetArtwork.getIs_sell())
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
                    .type(targetArtwork.getAttachment_list().get(i).getType())
                    .url(targetArtwork.getAttachment_list().get(i).getUrl())
                    .build()
            );
        }


        User targetUser = targetArtwork.getSell_user();
        Profile sellUserProfile = profileRepository.findByNickname(targetUser.getNickname());

        List<Comment> commentList = commentRepository.findAllByParentArtwork(targetArtwork);


        List<CommentResponseDto> commentResponseDtos = new ArrayList<>();
        for (int i=0;i<commentList.size();i++) {
            Comment comment = commentList.get(i);
            User commentUser = userRepository.findByNickname(comment.getProfile().getNickname());
            CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                    .content(comment.getContent())
                    .parent_artwork_id(comment.getParent_artwork().getArtwork_id())
                    .comment_id(comment.getComment_id())
                    .nickname(comment.getProfile().getNickname())
                    .modifiedDate(comment.getModifiedDate())
                    .createdDate(comment.getCreatedDate())
                    .profile_picture_url(comment.getProfile().getProfile_picture_url())
                    .userEmail(commentUser.getEmail())
                    .build();

            commentResponseDtos.add(commentResponseDto);
        }
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
                .comments(commentResponseDtos)
                .like_count(targetArtwork.getLike_count())
                .is_sell(targetArtwork.getIs_sell())
                .build();
    }

    public ArtworkResponseDto updateArtwork(Long artwork_id, ArtworkRequestDto artworkRequestDto, String token) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);

        User targetUser = userRepository.findByNickname(artworkRequestDto.getSell_user_nickname());
        if(!targetUser.getEmail().equals(jwtTokenProvider.getUserEmail(token)))
        {
            return null;
        }
        List<Attachment> attachmentInArtwork = attachmentRepositroy.findAllByArtwork_id(targetArtwork.getArtwork_id());

        for(int i=0;i<attachmentInArtwork.size();i++)
            attachmentRepositroy.delete(attachmentInArtwork.get(i));


        targetArtwork.updateDescription(artworkRequestDto.getDescription());
        targetArtwork.updateGenre(artworkRequestDto.getGenre());
        targetArtwork.updateIngredient(artworkRequestDto.getIngredient());
        targetArtwork.updateTitle(artworkRequestDto.getTitle());
        targetArtwork.updatePrice(artworkRequestDto.getPrice());


        List<Attachment> newAttachmentlist = new ArrayList<>();
        for(int i=0;i<artworkRequestDto.getAttachmentList().size();i++)
        {
            Attachment newAttachment = Attachment.builder()
                    .artwork_id(targetArtwork.getArtwork_id())
                    .type(artworkRequestDto.getAttachmentList().get(i).getType())
                    .url(artworkRequestDto.getAttachmentList().get(i).getUrl())
                    .build();
            attachmentRepositroy.save(newAttachment);
            newAttachmentlist.add(newAttachment);
        }

        targetArtwork.updateAttachment(newAttachmentlist);


        ArtworkResponseDto artworkResponseDto = ArtworkResponseDto.builder()
                .view_count(targetArtwork.getView_count())
                .like_count(targetArtwork.getLike_count())
                .artwork_id(artwork_id)
                .createdDate(targetArtwork.getCreatedDate())
                .attachmentRequestDtoList(artworkRequestDto.getAttachmentList())
                .description(artworkRequestDto.getDescription())
                .ingredient(artworkRequestDto.getIngredient())
                .genre(artworkRequestDto.getGenre())
                .price(artworkRequestDto.getPrice())
                .sell_user_nickname(targetUser.getNickname())
                .title(targetArtwork.getTitle())
                .is_sell(targetArtwork.getIs_sell())
                .build();
        return artworkResponseDto;
    }

    public int deleteArtwork(Long artwork_id) {
        System.out.println(artwork_id + " !!!!");
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);
        System.out.println(targetArtwork+"!!!!!!!");
        System.out.println(targetArtwork.getArtwork_id() + " here");
        artworkRepository.delete(targetArtwork);
        return 1;
    }

    public ArtworkPageDto getOnlyFollowingArtworksList(String userEmail, int pageNo) {
        //내가 팔로우 하는 사람들 리스트
        User user = userRepository.findByEmail(userEmail);
        Profile targetProfile = profileRepository.findByNickname(user.getNickname());
        List<Profile> follwingList = followRepository.getFollowingList(targetProfile);
        long totalCount = 0;
        List<ArtworkResponseDto> result = new ArrayList<>();

        for(int i=0;i<follwingList.size();i++) {
            System.out.println("내가 팔로우 하는 사람 : "+ follwingList.get(i).getNickname());
            User followingUser = userRepository.findByNickname(follwingList.get(i).getNickname());
            PageRequest page = PageRequest.of(pageNo-1, 20, Sort.by(Sort.Direction.DESC, "artwork_id"));//        Pa
            Page<Artwork> sellListPage = artworkRepository.findAllBySell_userPage(page, followingUser);

            totalCount+=sellListPage.getTotalElements();


            List<Artwork> sell_list = sellListPage.getContent();
            for(int j=0;j<sell_list.size();j++) {
                Artwork sellArtwork = sell_list.get(j);

                List<AttachmentRequestDto> attachmentRequestDtoList = new ArrayList<>();

                for(int k=0;k<sellArtwork.getAttachment_list().size();k++) {
                    attachmentRequestDtoList.add(AttachmentRequestDto.builder()
                            .type(sellArtwork.getAttachment_list().get(k).getType())
                            .url(sellArtwork.getAttachment_list().get(k).getUrl())
                            .build()
                    );
                }

                User findUser = userRepository.findByEmail(sellArtwork.getSell_user().getEmail());
                Profile findProfile = profileRepository.findByNickname(findUser.getNickname());

                ArtworkResponseDto artworkResponseDto = ArtworkResponseDto.builder()
                        .artwork_id(sellArtwork.getArtwork_id())
                        .attachmentRequestDtoList(attachmentRequestDtoList)
                        .ingredient(sellArtwork.getIngredient())
                        .view_count(sellArtwork.getView_count())
                        .title(sellArtwork.getTitle())
                        .sell_user_nickname(findUser.getNickname())
                        .profile_picture(findProfile.getProfile_picture_url())
                        .like_count(sellArtwork.getLike_count())
                        .sell_user_email(sellArtwork.getSell_user().getEmail())
                        .genre(sellArtwork.getGenre())
                        .price(sellArtwork.getPrice())
                        .description(sellArtwork.getDescription())
                        .createdDate(sellArtwork.getCreatedDate())
                        .is_sell(sellArtwork.getIs_sell())
                        .build();

                result.add(artworkResponseDto);
            }
        }

        Collections.sort(result, Collections.reverseOrder());
        ArtworkPageDto artworkPageDto = ArtworkPageDto.builder()
                .artworkResponseDto(result)
                .totalCount(totalCount)
                .build();
        return artworkPageDto;
    }

    public int sellArtwork(Long artwork_id) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);
        int previousStatus = targetArtwork.getIs_sell();
        if(previousStatus == 1)
            targetArtwork.updateSellStatus(2);
        else
            targetArtwork.updateSellStatus(1);

        return targetArtwork.getIs_sell();

    }

    public ArtworkPageDto getArtworksByPageNo(int pageNo) {
        PageRequest page = PageRequest.of(pageNo-1, 20, Sort.by(Sort.Direction.DESC, "artwork_id"));
        Page<Artwork> allArtworksPage = artworkRepository.findAll(page);

        List<Artwork> allArtworks = allArtworksPage.getContent();
        System.out.println(allArtworks.size() + "한페이지당 개수");
        System.out.println(allArtworksPage.getTotalElements() + "총 개수");
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
                    .is_sell(targetArtwork.getIs_sell())
                    .build());
        }
        ArtworkPageDto artworkPageDto = ArtworkPageDto.builder()
                .artworkResponseDto(artworkResponseDtoList)
                .totalCount(allArtworksPage.getTotalElements())
                .build();
        return artworkPageDto;
    }

    public ArtworkPageDto getAllArtworks(String userEmail, int pageNo) {
        User targetUser = userRepository.findByEmail(userEmail);
        Profile targetProfile = profileRepository.findByNickname(targetUser.getNickname());

        List<String> favorite_Genre = targetProfile.getFavorite_field();
        System.out.println("내가 선호하는 장르" + " " + favorite_Genre.size());
        for(int i=0;i<favorite_Genre.size();i++)
            System.out.println(favorite_Genre.get(i));

        List<Artwork> notLikeAndCommentArtworks = artworkRepository.findNotLikeAndCommentArtworks(targetUser, targetProfile,targetProfile);

        List<Artwork> notLikeAndCommentArtworksNotInGenre = new ArrayList<>();
        List<Artwork> notLikeAndCommentArtworksInGenre = new ArrayList<>();
        for(int i=0; i<notLikeAndCommentArtworks.size();i++) {
            Artwork targetArtwork = notLikeAndCommentArtworks.get(i);

            boolean check = false;
            for(int j=0;j<targetArtwork.getGenre().size();j++) {
                String genre = targetArtwork.getGenre().get(j);
                if(favorite_Genre.contains(genre)) {
                    //유저의 선호 분야 장르에 해당하는 게시물 이라면
                    check=true;
                }
            }

            if(check)  //해당한다면
                notLikeAndCommentArtworksInGenre.add(targetArtwork);
            else
                notLikeAndCommentArtworksNotInGenre.add(targetArtwork);
        }

        System.out.println("내가 좋아요와 댓글을 달지 않은 게시물 중 내가 선호하는 장르에 속하는 게시물");
        for(int i=0;i<notLikeAndCommentArtworksInGenre.size();i++)
            System.out.println(notLikeAndCommentArtworksInGenre.get(i).getTitle());

        System.out.println("내가 좋아요와 댓글을 달지 않은 게시물 중 내가 선호하는 장르에 속하지 않는 게시물");
        for(int i=0;i<notLikeAndCommentArtworksNotInGenre.size();i++)
            System.out.println(notLikeAndCommentArtworksNotInGenre.get(i).getTitle());

        return null;
    }
}
