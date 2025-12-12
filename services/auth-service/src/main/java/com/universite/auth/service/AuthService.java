package com.universite.auth.service;

import com.universite.auth.dto.AuthResponse;
import com.universite.auth.dto.LoginRequest;
import com.universite.auth.dto.RegisterRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    // Mock users database
    private final Map<String, UserData> users = new HashMap<>();

    public AuthService(JwtService jwtService) {
        this.jwtService = jwtService;
        this.passwordEncoder = new BCryptPasswordEncoder();
        initializeMockData();
    }

    private void initializeMockData() {
        // Pre-populate with test users
        users.put("admin", new UserData(1L, "admin", "admin@universite.edu",
                "$2a$10$slYQmyNdGzin7olVN3p5Be5nVzN8p7t/m.R5k8U1z1T4RbBJGSEsm", "ROLE_ADMIN"));
        users.put("student1", new UserData(2L, "student1", "student@universite.edu",
                "$2a$10$slYQmyNdGzin7olVN3p5Be5nVzN8p7t/m.R5k8U1z1T4RbBJGSEsm", "ROLE_STUDENT"));
        users.put("professor1", new UserData(3L, "professor1", "professor@universite.edu",
                "$2a$10$slYQmyNdGzin7olVN3p5Be5nVzN8p7t/m.R5k8U1z1T4RbBJGSEsm", "ROLE_PROFESSOR"));
    }

    public AuthResponse login(LoginRequest request) {
        UserData user = null;
        
        // Try to find user by email first (preferred), then by username
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            user = users.values().stream()
                    .filter(u -> u.email.equals(request.getEmail()))
                    .findFirst()
                    .orElse(null);
        }
        
        // If not found by email, try username
        if (user == null && request.getUsername() != null && !request.getUsername().isEmpty()) {
            user = users.get(request.getUsername());
        }
        
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // For demo purposes, accept "password" or validate bcrypt hash
        boolean isPasswordValid = "password".equals(request.getPassword()) ||
                passwordEncoder.matches(request.getPassword(), user.password);

        if (!isPasswordValid) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.username, user.email, user.role, user.userId);

        return new AuthResponse(
                token,
                "Bearer",
                user.userId,
                user.username,
                user.email,
                user.role
        );
    }

    public AuthResponse register(RegisterRequest request) {
        if (users.containsKey(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        Long newUserId = (long) (users.size() + 1);
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        UserData newUser = new UserData(
                newUserId,
                request.getUsername(),
                request.getEmail(),
                encodedPassword,
                "ROLE_STUDENT"
        );

        users.put(request.getUsername(), newUser);

        String token = jwtService.generateToken(newUser.username, newUser.email, newUser.role, newUser.userId);

        return new AuthResponse(
                token,
                "Bearer",
                newUser.userId,
                newUser.username,
                newUser.email,
                newUser.role
        );
    }

    public AuthResponse verify(String token) {
        if (!jwtService.validateToken(token)) {
            throw new RuntimeException("Invalid token");
        }

        String username = jwtService.getUsernameFromToken(token);
        UserData user = users.get(username);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return new AuthResponse(
                token,
                "Bearer",
                user.userId,
                user.username,
                user.email,
                user.role
        );
    }

    // Helper class for user data
    private static class UserData {
        Long userId;
        String username;
        String email;
        String password;
        String role;

        UserData(Long userId, String username, String email, String password, String role) {
            this.userId = userId;
            this.username = username;
            this.email = email;
            this.password = password;
            this.role = role;
        }
    }
}
