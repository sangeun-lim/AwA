package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.profile.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    @Query("select p from Profile p where p.nickname=:nickname")
    Profile findByNickname(@Param("nickname") String nickname);

    @Query("select p from Profile p where p.profile_id=:profile_id")
    Profile findByProfile_id(@Param("profile_id") Long id);
}
