package com.cslounge.backend.vote;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostVoteController {

    private final PostVoteService postVoteService;

    public PostVoteController(
        PostVoteService postVoteService
    ) {
        this.postVoteService = postVoteService;
    }

    @PutMapping("/posts/{postId}/vote")
    public ResponseEntity<?> vote(
        @PathVariable Long postId,
        @RequestBody VoteRequest request,
        HttpSession session
    ) {
        Object userId = session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("You must be logged in to vote");
        }

        try {
            PostVote vote = postVoteService.vote(
                postId,
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

    @DeleteMapping("/posts/{postId}/vote")
    public ResponseEntity<?> removeVote(
        @PathVariable Long postId,
        HttpSession session
    ) {
        Object userId = session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("You must be logged in to vote");
        }

        postVoteService.removeVote(
            postId,
            (Long) userId
        );

        return ResponseEntity.noContent().build();
    }
}