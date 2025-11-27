package com.stroms.solutions.service;

import com.stroms.solutions.model.Product;
import com.stroms.solutions.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> all() { return productRepository.findAll(); }
    public Optional<Product> get(Long id) { return productRepository.findById(id); }
    public Product create(Product p) { return productRepository.save(p); }
    public Product update(Long id, Product p) {
        return productRepository.findById(id)
                .map(db -> {
                    db.setName(p.getName());
                    db.setDescription(p.getDescription());
                    db.setCategory(p.getCategory());
                    db.setPrice(p.getPrice());
                    db.setStock(p.getStock());
                    db.setStockCritical(p.getStockCritical());
                    db.setOnSale(p.getOnSale());
                    db.setImage(p.getImage());
                    return productRepository.save(db);
                }).orElseThrow();
    }
    public void delete(Long id) { productRepository.deleteById(id); }
}
