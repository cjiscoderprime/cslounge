package com.cslounge.backend.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service 
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse registerUser(RegisterUserRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        String passwordHash = passwordEncoder.encode(request.password());

        User user = new User(
            request.username(),
            passwordHash
        );

        User savedUser = userRepository.save(user);

        return new UserResponse(
            savedUser.getId(),
            savedUser.getUsername()
        );
    }

    public UserResponse loginUser(LoginUserRequest request) {
        User user = userRepository.findByUsername(request.username())
        .orElseThrow(() -> 
            new IllegalArgumentException("Invalid username or password")
        );
    if (
        user.getPasswordHash() == null || 
        !passwordEncoder.matches(
            request.password(),
            user.getPasswordHash()
        )
    ) {
        throw new IllegalArgumentException("Invalid username or password");
    }

    return new UserResponse(
        user.getId(),
        user.getUsername()
    );
    }
}