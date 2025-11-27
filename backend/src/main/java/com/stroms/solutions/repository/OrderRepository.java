package com.stroms.solutions.repository;

import com.stroms.solutions.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
