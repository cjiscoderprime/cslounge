package com.cslounge.backend.comment;

import java.time.Instant;

public interface CommentRow {
    
    Long getId();

    Long getPostId();

    String getContent();

    String getAuthor();

    Instant getCreatedAt();
    
    Long getVotes();
}
