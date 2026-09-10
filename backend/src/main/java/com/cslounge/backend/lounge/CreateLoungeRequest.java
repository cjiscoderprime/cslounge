package com.cslounge.backend.lounge;

public record CreateLoungeRequest(
    String name,
    String slug
) {
    
}
