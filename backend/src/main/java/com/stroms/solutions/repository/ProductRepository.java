package com.stroms.solutions.repository;

import com.stroms.solutions.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
