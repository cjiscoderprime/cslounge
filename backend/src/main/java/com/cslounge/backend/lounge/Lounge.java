package com.cslounge.backend.lounge;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Entity
@Table(name = "lounges")
public class Lounge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String slug;

    protected Lounge(){

    }

    public Lounge(String name, String slug){
        this.name = name;
        this.slug = slug;
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