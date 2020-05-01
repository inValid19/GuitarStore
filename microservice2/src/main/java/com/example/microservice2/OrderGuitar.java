package com.example.microservice2;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Transient;

@Entity
public class OrderGuitar {

    @EmbeddedId
    @JsonIgnore
    private OrderGuitarPK pk;

    @Column(nullable = false)
    private Integer quantity;

    public OrderGuitar() {
        super();
    }

    public OrderGuitar(Order order, Guitar product, Integer quantity) {
        pk = new OrderGuitarPK();
        pk.setOrder(order);
        pk.setGuitar(product);
        this.quantity = quantity;
    }

    @Transient
    public Guitar getGuitar() {
        return this.pk.getGuitar();
    }

    @Transient
    public Double getTotalPrice() {
        return getGuitar().getPrice() * getQuantity();
    }

    public Integer getQuantity() {
        return quantity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((pk == null) ? 0 : pk.hashCode());

        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        OrderGuitar other = (OrderGuitar) obj;
        if (pk == null) {
            if (other.pk != null) {
                return false;
            }
        } else if (!pk.equals(other.pk)) {
            return false;
        }

        return true;
    }
}