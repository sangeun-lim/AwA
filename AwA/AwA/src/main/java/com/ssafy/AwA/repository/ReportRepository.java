package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReportRepository extends JpaRepository<Report, Long> {
    @Query("select r from Report r where r.report_id=:report_id")
    Report findByReport_id(@Param("report_id") Long report_id);
}
