package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
