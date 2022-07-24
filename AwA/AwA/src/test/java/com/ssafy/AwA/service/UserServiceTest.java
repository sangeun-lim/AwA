package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserServiceTest {

    @Autowired UserService userService;
    @Autowired UserRepository userRepository;

    @Autowired EntityManager em;

    @Test
    public void 회원가입() throws Exception {
        //given
        User user = User.builder()
                .birth_date(LocalDate.of(1997,12,11))
                .email("rlatpwls15@naver.com")
                .gender(1)
                .is_manager(false)
                .description("간단한 자기소개")
                .nickname("sezin")
                .password("1234")
                .build();

        //when
        Long savedId = userService.join(user);

        //then
        assertEquals(user, userRepository.findOne(savedId));
    }

    @Test
    public void 중복_회원_예외() throws Exception {
    //given
        User user1 = User.builder()
                .birth_date(LocalDate.of(1997,12,11))
                .email("rlatpwls152@naver.com")
                .gender(1)
                .is_manager(false)
                .description("간단한 자기소개")
                .nickname("sezin2")
                .password("1234")
                .build();

        User user2 = User.builder()
                .birth_date(LocalDate.of(1997,12,11))
                .email("rlatpwls15@naver.com")
                .gender(1)
                .is_manager(false)
                .description("간단한 자기소개")
                .nickname("sezin")
                .password("1234")
                .build();
    //when
        Long user1_id = userService.join(user1);
        Long user2_id = userService.join(user2);

    //then
        System.out.println(user1_id);
        System.out.println(user2_id);
    }
}