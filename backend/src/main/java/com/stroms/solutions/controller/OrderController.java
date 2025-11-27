package com.stroms.solutions.controller;

import com.stroms.solutions.model.Order;
import com.stroms.solutions.service.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','VENDOR')")
    public List<Order> all() {
        return orderService.all();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','VENDOR')")
    public Order get(@PathVariable Long id) {
        return orderService.get(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','VENDOR','CLIENT')")
    public Order create(@RequestBody Order order) {
        return orderService.create(order);
    }
}
