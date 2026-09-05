package com.cslounge.backend.post;

public interface PostFeedRow {
    Long getId();
    String getTitle();
    String getContent();
    String getAuthor();
    String getLounge();
    Long getVotes();
    Long getComments();
}


