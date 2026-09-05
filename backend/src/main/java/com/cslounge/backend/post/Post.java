package com.cslounge.backend.post;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name= "posts")
public class Post{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author_id")
    private Long authorId;

    @Column(name="lounge_id")
    private Long loungeId;

    private String title;

    private String content;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    public Post(Long authorId, Long loungeId, String title, String content){
    this.authorId = authorId;
    this.loungeId = loungeId;
    this.title = title;
    this.content = content;
    }

    public Long getId(){
        return id;
    }

    public Long getAuthorId(){
        return authorId;
    }

    public Long getLoungeId(){
        return loungeId;
    }

    public String getTitle(){
        return title;
    }

    public String getContent(){
        return content;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}

