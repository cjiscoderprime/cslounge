package com.cslounge.backend.commentvote;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentVoteService {

    private final CommentVoteRepository repository;

    public CommentVoteService(
        CommentVoteRepository repository
    ) {
        this.repository = repository;
    }

    @Transactional
    public CommentVote vote(
        Long commentId,
        Long userId,
        short value
    ) {
        if (value != 1 && value != -1) {
            throw new IllegalArgumentException(
                "Vote must be 1 or -1"
            );
        }

        CommentVote existingVote =
            repository
                .findByCommentIdAndUserId(
                    commentId,
                    userId
                )
                .orElse(null);

        if (existingVote != null) {
            existingVote.setValue(value);

            return repository.save(existingVote);
        }

        CommentVote newVote =
            new CommentVote(
                commentId,
                userId,
                value
            );

        return repository.save(newVote);
    }
}