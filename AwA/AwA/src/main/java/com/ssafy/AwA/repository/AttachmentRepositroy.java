package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.attachment.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepositroy extends JpaRepository<Attachment, Long> {
}
