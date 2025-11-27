package com.stroms.solutions.config;

import com.stroms.solutions.model.Product;
import com.stroms.solutions.model.Role;
import com.stroms.solutions.model.User;
import com.stroms.solutions.repository.ProductRepository;
import com.stroms.solutions.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seed(UserRepository users, ProductRepository products, PasswordEncoder encoder) {
        return args -> {
            if (users.count() == 0) {
                users.save(User.builder()
                        .name("Administrador")
                        .email("admin@duoc.cl")
                        .password(encoder.encode("admin123"))
                        .roles(Set.of(Role.ADMIN))
                        .build());
                users.save(User.builder()
                        .name("Vendedor Demo")
                        .email("vendedor@duoc.cl")
                        .password(encoder.encode("vendedor123"))
                        .roles(Set.of(Role.VENDOR))
                        .build());
                users.save(User.builder()
                        .name("Cliente Demo")
                        .email("cliente@duoc.cl")
                        .password(encoder.encode("cliente123"))
                        .roles(Set.of(Role.CLIENT))
                        .build());
            }
            if (products.count() == 0) {
                products.saveAll(List.of(
                        Product.builder().name("Interruptor Simple").description("Interruptor de pared simple").category("Interruptores").price(2990d).stock(50).stockCritical(5).onSale(false).build(),
                        Product.builder().name("Tomacorriente Doble").description("Con conexión a tierra").category("Tomacorrientes").price(4990d).stock(35).stockCritical(5).onSale(false).build(),
                        Product.builder().name("Panel Solar 100W").description("Panel monocristalino").category("Energía Solar").price(89990d).stock(15).stockCritical(2).onSale(true).build()
                ));
            }
        };
    }
}
