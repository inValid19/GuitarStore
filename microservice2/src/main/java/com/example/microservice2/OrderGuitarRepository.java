package com.example.microservice2;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderGuitarRepository extends JpaRepository<OrderGuitar, OrderGuitarPK> {
}