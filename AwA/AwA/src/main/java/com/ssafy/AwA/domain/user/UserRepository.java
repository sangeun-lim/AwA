package com.ssafy.AwA.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final EntityManager em;

    public Long save(User user) {
        em.persist(user);
        return user.getUser_id();
    }

    public User find(Long user_id) {
        return em.find(User.class, user_id);
    }
}
