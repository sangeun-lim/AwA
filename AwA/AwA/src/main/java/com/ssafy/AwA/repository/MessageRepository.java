package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.chat.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
