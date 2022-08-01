package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findUserByGender(int gender);
    User findByEmail(String email);
    User findByNickname(String nickname);
    User findByEmailAndPassword(String email, String password);

    @Query("select u from User u where u.user_id=:user_id")
    User findByUser_id(@Param("user_id") Long user_id);

    @Query("select u.refreshToken from User u where u.user_id=:user_id")
    String getRefreshToken(@Param("user_id") Long user_id);

    @Query("select u from User u where u.refreshToken=:refreshToken")
    User findByToken(@Param("refreshToken") String refreshToken);

}
