package com.ssafy.AwA.service;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.report.Report;
import com.ssafy.AwA.dto.ReportRequestDto;
import com.ssafy.AwA.dto.ReportResponseDto;
import com.ssafy.AwA.repository.ArtworkRepository;
import com.ssafy.AwA.repository.ProfileRepository;
import com.ssafy.AwA.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {

    private final ArtworkRepository artworkRepository;
    private final ReportRepository reportRepository;
    private final ProfileRepository profileRepository;
    public ReportResponseDto saveReport(Long artwork_id, ReportRequestDto reportDto) {
        Artwork targetArtwork = artworkRepository.findByArtwork_id(artwork_id);
        Profile targetProfile = profileRepository.findByNickname(reportDto.getReport_profile_nickname());

        Report newReport = Report.builder()
                .category(reportDto.getCategory())
                .content(reportDto.getContent())
                .reported_artwork(targetArtwork)
                .profile(targetProfile)
                .build();

        Report savedReport = reportRepository.save(newReport);

        return ReportResponseDto.builder()
                .report_id(savedReport.getReport_id())
                .reported_artwork_id(targetArtwork.getArtwork_id())
                .report_profile_nickname(savedReport.getReport_profile().getNickname())
                .category(savedReport.getCategory())
                .content(savedReport.getContent())
                .build();
    }
}
