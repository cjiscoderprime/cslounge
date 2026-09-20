package com.cslounge.backend.user;

public record RegisterUserRequest(
    String username,
    String password
) {
}