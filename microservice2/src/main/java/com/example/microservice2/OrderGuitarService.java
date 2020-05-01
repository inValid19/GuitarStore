package com.example.microservice2;

import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface OrderGuitarService {
    OrderGuitar create(@NotNull(message = "The products for order cannot be null.") @Valid OrderGuitar orderGuitar);
}