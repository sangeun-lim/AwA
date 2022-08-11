package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.CommentRequestDto;
import com.ssafy.AwA.dto.CommentResponseDto;
import com.ssafy.AwA.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentApiController {

    private final CommentService commentService;
    @PostMapping()
    public CommentResponseDto saveComment(@RequestBody CommentRequestDto commentRequestDto, @RequestHeader(value="X-AUTH-TOKEN") String token, @RequestHeader(value="RefreshToken") String refreshToken) {
        return commentService.saveComment(commentRequestDto);
    }

    @PutMapping("/{commentId}")
    public CommentResponseDto updateComment(@PathVariable("commentId") Long commentId, @RequestBody CommentRequestDto commentRequestDto, @RequestHeader(value="X-AUTH-TOKEN") String token, @RequestHeader(value="RefreshToken") String refreshToken) {
        return commentService.updateComment(commentRequestDto, commentId);
    }

    @DeleteMapping("/{commentId}")
    public int deleteComment(@PathVariable("commentId") Long commentId, @RequestHeader(value="X-AUTH-TOKEN") String token, @RequestHeader(value="RefreshToken") String refreshToken) {
        return commentService.deleteComment(commentId);
    }

    @GetMapping("/{commentId}")
    public CommentResponseDto getComment(@PathVariable("commentId") Long commentId) {
        return commentService.getComment(commentId);
    }
}
