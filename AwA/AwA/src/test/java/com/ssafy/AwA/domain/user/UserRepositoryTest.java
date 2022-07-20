package com.ssafy.AwA.domain.user;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {

    @Autowired UserRepository userRepository;


    @Test
    @Transactional
    //@Rollback(value = false)
    public void testUser() throws Exception {
        //given
        User user = new User();
        user.createUser("rlatpwls15@naver.com", "1234","sezin");

        //when
        Long savedUserId = userRepository.save(user);
        User findUser = userRepository.find(savedUserId);

        //then
        Assertions.assertThat(findUser.getEmail()).isEqualTo(user.getEmail());
        Assertions.assertThat(findUser.getPassword()).isEqualTo(user.getPassword());

    }
}