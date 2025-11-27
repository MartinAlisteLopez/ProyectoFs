package com.proyectofs.backend.service;

import com.proyectofs.backend.model.Order;
import com.proyectofs.backend.model.OrderItem;
import com.proyectofs.backend.model.Product;
import com.proyectofs.backend.model.User;
import com.proyectofs.backend.repository.OrderRepository;
import com.proyectofs.backend.repository.OrderItemRepository;
import com.proyectofs.backend.repository.ProductRepository;
import com.proyectofs.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class OrderServiceTest {
    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderItemRepository orderItemRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateOrder() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");

        Product product = new Product();
        product.setId(1L);
        product.setName("Test Product");
        product.setPrice(10.0);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any())).thenAnswer(invocation -> {
            Order o = invocation.getArgument(0);
            o.setId(1L);
            return o;
        });
        when(orderItemRepository.save(any())).thenAnswer(invocation -> {
            OrderItem oi = invocation.getArgument(0);
            oi.setId(1L);
            return oi;
        });

        List<OrderService.OrderItemRequest> items = List.of(
                new OrderService.OrderItemRequest(1L, 2)
        );

        Order order = orderService.createOrder(1L, items);

        assertNotNull(order);
        assertEquals(20.0, order.getTotal());
        verify(orderRepository, times(2)).save(any());
        verify(orderItemRepository, times(1)).save(any());
    }

    @Test
    public void testGetOrdersByUserId() {
        Order order = new Order();
        order.setId(1L);
        
        when(orderRepository.findByUserId(1L)).thenReturn(List.of(order));
        
        List<Order> orders = orderService.getOrdersByUserId(1L);
        
        assertNotNull(orders);
        assertEquals(1, orders.size());
        verify(orderRepository, times(1)).findByUserId(1L);
    }
}
