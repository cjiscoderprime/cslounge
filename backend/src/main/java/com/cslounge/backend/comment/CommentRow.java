package com.cslounge.backend.comment;

import java.time.Instant;

public interface CommentRow {
    
    Long getId();

    String getContent();

    String getAuthor();

    Instant getCreatedAt();
}
