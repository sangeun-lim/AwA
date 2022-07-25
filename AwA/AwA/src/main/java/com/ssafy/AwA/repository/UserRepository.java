package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findUserByGender(int gender);
    User findByEmail(String email);
    User findByNickname(String nickname);

    User findByEmailAndPassword(String email, String password);



}
