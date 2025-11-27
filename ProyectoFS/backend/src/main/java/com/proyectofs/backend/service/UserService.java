package com.proyectofs.backend.service;

import com.proyectofs.backend.model.User;
import com.proyectofs.backend.model.Role;
import com.proyectofs.backend.repository.UserRepository;
import com.proyectofs.backend.repository.RoleRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User registerUser(String username, String password, String email, String roleName) {
        // Check if user exists
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // TODO: encrypt password in prod
        user.setEmail(email);

        Optional<Role> role = roleRepository.findByName(roleName);
        if (role.isPresent()) {
            user.setRoles(Set.of(role.get()));
        }

        return userRepository.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
