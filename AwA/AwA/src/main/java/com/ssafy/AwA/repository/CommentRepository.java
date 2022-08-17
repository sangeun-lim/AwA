package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.comment.Comment;
import com.ssafy.AwA.domain.profile.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c where c.comment_id=:comment_id")
    Comment findByComment_id(@Param("comment_id") Long comment_id);

    @Query("select c from Comment c where c.parent_artwork=:parent_artwork ORDER BY c.createdDate asc")
    List<Comment> findAllByParentArtwork(@Param("parent_artwork") Artwork parent_artwork);

    @Query("select c from Comment c where c.profile=:profile")
    List<Comment> findAllByfromProfile(@Param("profile") Profile profile);
}
