package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.attachment.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttachmentRepositroy extends JpaRepository<Attachment, Long> {
    @Query("select A from Attachment A where A.artwork_id=:artwork_id")
    List<Attachment> findAllByArtwork_id(@Param("artwork_id") Long artwork_id);
}
