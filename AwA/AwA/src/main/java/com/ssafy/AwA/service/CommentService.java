package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.comment.Comment;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.dto.CommentRequestDto;
import com.ssafy.AwA.dto.CommentResponseDto;
import com.ssafy.AwA.repository.ArtworkRepository;
import com.ssafy.AwA.repository.CommentRepository;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
    private final ArtworkRepository artworkRepository;
    private final CommentRepository commentRepository;
    private final ProfileRepository profileRepository;

    private final UserRepository userRepository;
    public CommentResponseDto saveComment(CommentRequestDto commentRequestDto) {
        Profile writer = profileRepository.findByNickname(commentRequestDto.getNickname());
        Artwork targetArtwork = artworkRepository.findByArtwork_id(commentRequestDto.getParent_artwork_id());
        User targetUser = userRepository.findByNickname(writer.getNickname());

        Comment comment = Comment.builder()
                .content(commentRequestDto.getContent())
                .profile(writer)
                .parent_artwork(targetArtwork)
                .build();

        Comment savedComment = commentRepository.save(comment);

        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .createdDate(savedComment.getCreatedDate())
                .modifiedDate(savedComment.getModifiedDate())
                .comment_id(savedComment.getComment_id())
                .content(savedComment.getContent())
                .nickname(writer.getNickname())
                .parent_artwork_id(savedComment.getParent_artwork().getArtwork_id())
                .profile_picture_url(writer.getProfile_picture_url())
                .userEmail(targetUser.getEmail())
                .build();
        return commentResponseDto;
    }

    public CommentResponseDto updateComment(CommentRequestDto commentRequestDto, Long commentId) {
        Comment targetComment = commentRepository.findByComment_id(commentId);
        Profile writer = targetComment.getProfile();
        User targetUser = userRepository.findByNickname(writer.getNickname());
        targetComment.updateContent(commentRequestDto.getContent());

        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .createdDate(targetComment.getCreatedDate())
                .modifiedDate(targetComment.getModifiedDate())
                .comment_id(targetComment.getComment_id())
                .content(targetComment.getContent())
                .nickname(targetComment.getProfile().getNickname())
                .parent_artwork_id(targetComment.getParent_artwork().getArtwork_id())
                .profile_picture_url(writer.getProfile_picture_url())
                .userEmail(targetUser.getEmail())
                .build();

        return commentResponseDto;
    }

    public int deleteComment(Long commentId) {
        Comment targetComment = commentRepository.findByComment_id(commentId);
        commentRepository.delete(targetComment);
        return 1;
    }

    public CommentResponseDto getComment(Long commentId) {
        Comment targetComment = commentRepository.findByComment_id(commentId);

        Profile writer = targetComment.getProfile();
        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .createdDate(targetComment.getCreatedDate())
                .modifiedDate(targetComment.getModifiedDate())
                .comment_id(targetComment.getComment_id())
                .parent_artwork_id(targetComment.getParent_artwork().getArtwork_id())
                .nickname(targetComment.getProfile().getNickname())
                .content(targetComment.getContent())
                .profile_picture_url(writer.getProfile_picture_url())
                .build();

        return commentResponseDto;
    }
}
