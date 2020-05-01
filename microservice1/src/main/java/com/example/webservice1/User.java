package com.example.webservice1;

import javax.persistence.*;

@Entity
public class User {

    @javax.persistence.Id
    @Column(name = ("id"))
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = ("name"))
    private String name;

    @Column(name = ("password"))
    private String password;

    @Column(name = ("type"))
    private String type;

    public User(){
        super();
    }

    public User(long id, String name, String password, String type){
        super();
        this.id = id;
        this.name = name;
        this.password = password;
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
}