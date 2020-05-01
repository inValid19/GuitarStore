package com.example.microservice2;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "order")
public class OrderGuitarPK implements Serializable {

    private static final long serialVersionUID = 476151177562655457L;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "guitar_id")
    private Guitar guitar;

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Guitar getGuitar() {
        return guitar;
    }

    public void setGuitar(Guitar guitar) {
        this.guitar = guitar;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;

        result = prime * result + ((order.getId() == null)
                ? 0
                : order
                .getId()
                .hashCode());
        result = prime * result + ((guitar.getId() == null)
                ? 0
                : guitar
                .getId()
                .hashCode());

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
        OrderGuitarPK other = (OrderGuitarPK) obj;
        if (order == null) {
            if (other.order != null) {
                return false;
            }
        } else if (!order.equals(other.order)) {
            return false;
        }

        if (guitar == null) {
            if (other.guitar != null) {
                return false;
            }
        } else if (!guitar.equals(other.guitar)) {
            return false;
        }

        return true;
    }
}