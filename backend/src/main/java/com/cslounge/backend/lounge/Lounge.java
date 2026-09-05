package com.cslounge.backend.lounge;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "lounges")
public class Lounge {

    @Id
    private Long id;

    private String name;

    private String slug;

    protected Lounge(){

    }

    public Long getId(){
        return id;
    }

    public String getName(){
        return name;
    } 

    public String getSlug(){
        return slug;
    }
}