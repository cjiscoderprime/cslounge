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

        PostVote existingVote =
            postVoteRepository
                .findByPostIdAndUserId(
                    postId,
                    userId
                )
                .orElse(null);

        if (existingVote != null) {

            // Clicking the same vote again removes it
            if (existingVote.getValue() == value) {
                postVoteRepository.delete(existingVote);

                // Return the old object so the controller
                // can still return a normal JSON response.
                return existingVote;
            }

            // Opposite vote: change direction
            existingVote.setValue(value);

            return postVoteRepository.save(existingVote);
        }

        // User has not voted yet
        PostVote newVote =
            new PostVote(
                postId,
                userId,
                value
            );

        return postVoteRepository.save(newVote);
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