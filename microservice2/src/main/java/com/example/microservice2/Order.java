package com.example.microservice2;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="orderGuitars")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dateCreated;

    private String status;

    @OneToMany(mappedBy = "pk.order")
    @Valid
    private List<OrderGuitar> orderGuitars = new ArrayList<>();

    @Transient
    public Double getTotalOrderPrice() {
        double sum = 0D;
        List<OrderGuitar> orderGuitars = getOrderGuitars();
        for (OrderGuitar op : orderGuitars) {
            sum += op.getTotalPrice();
        }

        return sum;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderGuitar> getOrderGuitars() {
        return orderGuitars;
    }

    public void setOrderGuitars(List<OrderGuitar> orderGuitars) {
        this.orderGuitars = orderGuitars;
    }

    @Transient
    public int getNumberOfGuitars() {
        return this.orderGuitars.size();
    }
}
