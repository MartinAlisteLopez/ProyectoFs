package com.proyectofs.backend.controller;

import com.proyectofs.backend.model.User;
import com.proyectofs.backend.security.JwtUtil;
import com.proyectofs.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        User user = userService.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            String role = user.getRoles().isEmpty() ? "ROLE_CLIENT" : user.getRoles().iterator().next().getName();
            String token = jwtUtil.generateToken(username, role);
            return ResponseEntity.ok(Map.of("token", token, "userId", user.getId(), "username", username));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String email = body.get("email");
        String role = body.getOrDefault("role", "ROLE_CLIENT");

        try {
            User user = userService.registerUser(username, password, email, role);
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
}
