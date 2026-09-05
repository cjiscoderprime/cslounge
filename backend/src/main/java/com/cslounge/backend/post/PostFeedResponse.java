package com.cslounge.backend.post;

public record PostFeedResponse(
    Long id,
    String title,
    String content,
    String author,
    String lounge,
    long votes,
    long comments
) {
}