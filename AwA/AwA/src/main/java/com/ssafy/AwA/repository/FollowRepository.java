package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.follow.Follow;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {
   @Query("select f from Follow f where f.fromProfile =:fromProfile and f.toProfile =:toProfile")
    Follow findByFromUserAndToUser(@Param("fromProfile") Profile fromProfile, @Param("toProfile") Profile toProfile);
}
