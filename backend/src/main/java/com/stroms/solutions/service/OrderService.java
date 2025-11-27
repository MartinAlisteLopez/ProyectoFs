package com.stroms.solutions.service;

import com.stroms.solutions.model.Order;
import com.stroms.solutions.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> all() { return orderRepository.findAll(); }
    public Order get(Long id) { return orderRepository.findById(id).orElseThrow(); }
    public Order create(Order order) {
        order.setCreatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }
}
