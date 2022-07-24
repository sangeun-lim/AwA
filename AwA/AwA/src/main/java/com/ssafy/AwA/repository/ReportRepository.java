package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
