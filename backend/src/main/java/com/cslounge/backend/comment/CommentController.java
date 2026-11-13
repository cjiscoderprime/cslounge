package com.cslounge.backend.comment;

import jakarta.servlet.http.HttpSession;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {

    private final CommentService commentService;

    public CommentController(
        CommentService commentService
    ) {
        this.commentService = commentService;
    }

    @GetMapping("/posts/{postId}/comments")
    public List<CommentResponse> getComments(
        @PathVariable Long postId
    ) {
        return commentService.getCommentsForPost(postId);
    }

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<?> createComment(
        @PathVariable Long postId,
        @RequestBody CreateCommentRequest request,
        HttpSession session
    ) {
        Object userId = session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("You must be logged in to comment");
        }

        if (
            request.content() == null ||
            request.content().isBlank()
        ) {
            return ResponseEntity
                .badRequest()
                .body("Comment cannot be empty");
        }

        Comment comment = commentService.createComment(
            postId,
            (Long) userId,
            request
        );

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(comment);
    }
}