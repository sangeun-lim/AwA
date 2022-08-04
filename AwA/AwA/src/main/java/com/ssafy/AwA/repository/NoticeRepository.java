package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.follow.Follow;
import com.ssafy.AwA.domain.notice.Notice;
import com.ssafy.AwA.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("select N from Notice N ORDER BY N.createdDate DESC")
    List<Notice> findAllOrderBy();

    @Query("select n from Notice n where n.notice_id =:noticeId")
    Notice findByNotice_id(@Param("noticeId") Long noticeId);
}
