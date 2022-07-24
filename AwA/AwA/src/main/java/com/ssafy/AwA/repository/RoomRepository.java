package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.chat.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
