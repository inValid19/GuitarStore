package com.example.microservice2;

import javax.persistence.*;

import javax.validation.constraints.NotNull;

@Entity(name = "Guitar")
public class Guitar {

    @javax.persistence.Id
    @Column(name = ("id"))
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @NotNull(message = "Product name is required.")
    @Basic(optional = false)
    @Column(name = ("name"))
    private String name;

    @Column(name = ("type"))
    private String type;

    @Column(name = ("price"))
    private double price;

    private String pictureUrl;

    public Guitar(){
        super();
    }

    public Guitar(long id,String name, String type, double price){
        super();
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        //this.pictureUrl = pictureUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }
}