package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c where c.comment_id=:comment_id")
    Comment findByComment_id(@Param("comment_id") Long comment_id);
}
