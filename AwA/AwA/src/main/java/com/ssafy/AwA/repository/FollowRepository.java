package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.follow.Follow;
import com.ssafy.AwA.domain.profile.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
   @Query("select f from Follow f where f.fromProfile =:fromProfile and f.toProfile =:toProfile")
    Follow findByFromUserAndToUser(@Param("fromProfile") Profile fromProfile, @Param("toProfile") Profile toProfile);

   @Query("select f.toProfile from Follow f where f.fromProfile=:fromProfile")
    List<Profile> getFollowingList(@Param("fromProfile") Profile fromProfile);

    @Query("select f.fromProfile from Follow f where f.toProfile=:toProfile")
    List<Profile> getFollwerList(@Param("toProfile") Profile toProfile);

    @Query(value = "SELECT to_profile_id FROM follow GROUP BY to_profile_id ORDER BY COUNT(*) DESC",nativeQuery = true)
    List<Long> findTop10ByFollowing();



    @Query("SELECT F from Follow F where F.fromProfile=:fromProfile and F.toProfile=:toProfile")
    Follow findByHaveFollow(@Param("fromProfile") Profile fromProfile, @Param("toProfile") Profile toProfile);
}
