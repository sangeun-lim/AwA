package com.ssafy.AwA.api;

import com.ssafy.AwA.dto.CommentRequestDto;
import com.ssafy.AwA.dto.CommentResponseDto;
import com.ssafy.AwA.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentApiController {

    private final CommentService commentService;
    @PostMapping()
    public CommentResponseDto saveComment(@RequestBody CommentRequestDto commentRequestDto) {
        return commentService.saveComment(commentRequestDto);
    }

    @PutMapping("/{commentId}")
    public CommentResponseDto updateComment(@PathVariable("commentId") Long commentId, @RequestBody CommentRequestDto commentRequestDto) {
        return commentService.updateComment(commentRequestDto, commentId);
    }

    @DeleteMapping("/{commentId}")
    public int deleteComment(@PathVariable("commentId") Long commentId) {
        return commentService.deleteComment(commentId);
    }

    @GetMapping("/{commentId}")
    public CommentResponseDto getComment(@PathVariable("commentId") Long commentId) {
        return commentService.getComment(commentId);
    }
}
