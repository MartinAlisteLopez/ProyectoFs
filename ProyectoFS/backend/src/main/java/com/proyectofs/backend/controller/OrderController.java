package com.proyectofs.backend.controller;

import com.proyectofs.backend.model.Order;
import com.proyectofs.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CLIENT', 'ADMIN')")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> body) {
        try {
            Long userId = ((Number) body.get("userId")).longValue();
            List<Map<String, Object>> itemsList = (List<Map<String, Object>>) body.get("items");
            
            List<OrderService.OrderItemRequest> items = itemsList.stream()
                    .map(item -> new OrderService.OrderItemRequest(
                            ((Number) item.get("productId")).longValue(),
                            ((Number) item.get("quantity")).intValue()
                    ))
                    .toList();
            
            Order order = orderService.createOrder(userId, items);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('CLIENT', 'ADMIN')")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CLIENT', 'ADMIN')")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
