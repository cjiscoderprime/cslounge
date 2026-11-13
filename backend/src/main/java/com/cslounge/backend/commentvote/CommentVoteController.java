package com.cslounge.backend.commentvote;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentVoteController {

    private final CommentVoteService commentVoteService;

    public CommentVoteController(
        CommentVoteService commentVoteService
    ) {
        this.commentVoteService = commentVoteService;
    }

    @PutMapping("/comments/{commentId}/vote")
    public ResponseEntity<?> vote(
        @PathVariable Long commentId,
        @RequestBody CommentVoteRequest request,
        HttpSession session
    ) {
        Object userId = session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("You must be logged in to vote");
        }

        try {
            CommentVote vote = commentVoteService.vote(
                commentId,
                (Long) userId,
                request.value()
            );

            return ResponseEntity.ok(vote);

        } catch (IllegalArgumentException error) {
            return ResponseEntity
                .badRequest()
                .body(error.getMessage());
        }
    }
}
