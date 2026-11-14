package com.cslounge.backend.comment;

import java.time.Instant;

public record CommentResponse(
    Long id,
    Long postId, 
    String content,
    String author,
    Instant createdAt,
    Long votes
) {}


