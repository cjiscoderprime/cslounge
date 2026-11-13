package com.cslounge.backend.commentvote;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentVoteRepository
    extends JpaRepository<CommentVote, Long> {

    Optional<CommentVote> findByCommentIdAndUserId(
        Long commentId,
        Long userId
    );
}