package com.proyectofs.backend.service;

import com.proyectofs.backend.model.Order;
import com.proyectofs.backend.model.OrderItem;
import com.proyectofs.backend.model.Product;
import com.proyectofs.backend.model.User;
import com.proyectofs.backend.repository.OrderRepository;
import com.proyectofs.backend.repository.OrderItemRepository;
import com.proyectofs.backend.repository.ProductRepository;
import com.proyectofs.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                        ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Order createOrder(Long userId, List<OrderItemRequest> items) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setTotal(0.0);

        Order savedOrder = orderRepository.save(order);

        double total = 0.0;
        for (OrderItemRequest item : items) {
            Product product = productRepository.findById(item.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItemRepository.save(orderItem);
            total += orderItem.getTotal();
        }

        savedOrder.setTotal(total);
        return orderRepository.save(savedOrder);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    // DTO for order creation
    public static class OrderItemRequest {
        private Long productId;
        private Integer quantity;

        public OrderItemRequest() {}

        public OrderItemRequest(Long productId, Integer quantity) {
            this.productId = productId;
            this.quantity = quantity;
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
}
