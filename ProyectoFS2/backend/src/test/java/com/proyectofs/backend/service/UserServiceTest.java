package com.proyectofs.backend.service;

import com.proyectofs.backend.model.User;
import com.proyectofs.backend.model.Role;
import com.proyectofs.backend.repository.UserRepository;
import com.proyectofs.backend.repository.RoleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindByUsername() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        User foundUser = userService.findByUsername("testuser");
        assertNotNull(foundUser);
        assertEquals("testuser", foundUser.getUsername());
    }

    @Test
    public void testRegisterUser() {
        Role role = new Role();
        role.setId(1L);
        role.setName("ROLE_CLIENT");

        when(userRepository.findByUsername("newuser")).thenReturn(Optional.empty());
        when(roleRepository.findByName("ROLE_CLIENT")).thenReturn(Optional.of(role));
        when(userRepository.save(any())).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(1L);
            return u;
        });

        User registeredUser = userService.registerUser("newuser", "password", "newuser@test.com", "ROLE_CLIENT");
        
        assertNotNull(registeredUser);
        assertEquals("newuser", registeredUser.getUsername());
        verify(userRepository, times(1)).save(any());
    }

    @Test
    public void testRegisterUserAlreadyExists() {
        User existingUser = new User();
        existingUser.setUsername("existing");

        when(userRepository.findByUsername("existing")).thenReturn(Optional.of(existingUser));

        assertThrows(RuntimeException.class, () -> {
            userService.registerUser("existing", "password", "existing@test.com", "ROLE_CLIENT");
        });
    }
}
