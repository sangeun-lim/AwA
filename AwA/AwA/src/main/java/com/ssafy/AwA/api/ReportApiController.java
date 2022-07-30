package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.ReportRequestDto;
import com.ssafy.AwA.dto.ReportResponseDto;
import com.ssafy.AwA.service.ArtworkService;
import com.ssafy.AwA.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportApiController {

    private final ArtworkService artworkService;
    private final ReportService reportService;
    @PostMapping("/{artwork_id}")
    public ReportResponseDto saveReport(@PathVariable("artwork_id") Long artwork_id, @RequestBody @Valid ReportRequestDto reportDto) {
        return reportService.saveReport(artwork_id,reportDto);
    }

    @DeleteMapping("/{report_id}")
    public int deleteReport(@PathVariable("report_id") Long report_id) {
        return reportService.deleteReport(report_id);
    }

}
