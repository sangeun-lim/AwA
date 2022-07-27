package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.notice.Notice;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    @Query("select p from Profile p where p.nickname=:nickName")
    Profile findByNickname(@Param("nickName") String nickName);
}
