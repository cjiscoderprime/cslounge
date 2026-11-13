package com.cslounge.backend.vote;

import org.springframework.stereotype.Service;

@Service
public class PostVoteService {

    private final PostVoteRepository postVoteRepository;

    public PostVoteService(
        PostVoteRepository postVoteRepository
    ) {
        this.postVoteRepository = postVoteRepository;
    }

    public PostVote vote(
        Long postId,
        Long userId,
        short value
    ) {
        if (value != 1 && value != -1) {
            throw new IllegalArgumentException(
                "Vote must be 1 or -1"
            );
        }

        return postVoteRepository
            .findByPostIdAndUserId(postId, userId)
            .map(existingVote -> {
                existingVote.setValue(value);
                return postVoteRepository.save(existingVote);
            })
            .orElseGet(() ->
                postVoteRepository.save(
                    new PostVote(postId, userId, value)
                )
            );
    }

    public void removeVote(
        Long postId,
        Long userId
    ) {
        postVoteRepository
            .findByPostIdAndUserId(postId, userId)
            .ifPresent(postVoteRepository::delete);
    }
}