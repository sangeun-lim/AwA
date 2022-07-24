package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final EntityManager em;

    public Long save(User user) {
        em.persist(user);
        return user.getUser_id();
    }

    public User findOne(Long user_id) {
        return em.find(User.class, user_id);
    }

    public List<User> findAll() {
        return em.createQuery("select u from User u", User.class).getResultList();
    }

    public List<User> findByEmail(String email) {
        List<User> list = em.createQuery("select u from User u where User.email =:email", User.class)
                .setParameter("email", email)
                .getResultList();
        if(list == null)
            return new ArrayList<User>();
        else
            return list;
    }

    public List<User> findByNickname(String nickname) {
        List<User> list = em.createQuery("select u from User u where User.nickname =:nickname", User.class)
                .setParameter("nickname", nickname)
                .getResultList();
        if(list == null)
            return new ArrayList<User>();
        else
            return list;
    }


}
