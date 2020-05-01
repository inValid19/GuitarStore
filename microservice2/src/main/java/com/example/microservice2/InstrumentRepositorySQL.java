package com.example.microservice2;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentRepositorySQL extends JpaRepository<Guitar, Long> {
}