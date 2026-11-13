package com.cslounge.backend.vote;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostVoteRepository extends JpaRepository<PostVote, Long> {
    Optional<PostVote> findByPostIdAndUserId(
        Long postId,
        Long userId
    );
}
