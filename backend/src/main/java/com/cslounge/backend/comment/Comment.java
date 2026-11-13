package com.cslounge.backend.comment;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity 
@Table(name = "comments")
public class Comment {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id")
    private Long postId;

    @Column(name = "author_id")
    private Long authorId;

    private String content;

    @Column(
        name = "created_at",
        insertable = false,
        updatable = false
    )
    private OffsetDateTime createdAt;

    protected Comment() {}

    public Comment(
        Long postId,
        Long authorId,
        String content
    ) {
        this.postId = postId;
        this.authorId = authorId;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public Long getPostId() {
        return postId;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public String getContent() {
        return content;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

}

