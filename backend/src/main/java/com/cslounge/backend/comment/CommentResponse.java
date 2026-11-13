package com.cslounge.backend.comment;

import java.time.Instant;

public record CommentResponse(
    Long id,
    String content,
    String author,
    Instant createdAt,
    Long votes
) {}


