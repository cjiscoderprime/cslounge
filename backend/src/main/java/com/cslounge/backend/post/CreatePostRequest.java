package com.cslounge.backend.post;

public record CreatePostRequest (
    Long authorId,
    Long loungeId,
    String title,
    String content){
        
    }
