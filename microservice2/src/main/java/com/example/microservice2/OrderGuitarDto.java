package com.example.microservice2;

public class OrderGuitarDto {

    private Guitar product;
    private Integer quantity;

    public Guitar getGuitar() {
        return product;
    }

    public void setGuitar(Guitar product) {
        this.product = product;
}

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
