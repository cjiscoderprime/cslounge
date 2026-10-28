package com.cslounge.backend.user;

public record LoginUserRequest(
    String username, 
    String password
){
}