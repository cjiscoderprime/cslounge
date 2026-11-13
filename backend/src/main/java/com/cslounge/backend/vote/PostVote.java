package com.cslounge.backend.vote;

import jakarta.persistence.*;

@Entity
@Table(
    name = "post_votes",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"post_id", "user_id"})
    }
)
public class PostVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id")
    private Long postId;

    @Column(name = "user_id")
    private Long userId;

    private short value;

    protected PostVote() {}

    public PostVote(Long postId, Long userId, short value) {
        this.postId = postId;
        this.userId = userId;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public Long getPostId() {
        return postId;
    }

    public Long getUserId() {
        return userId;
    }

    public short getValue() {
        return value;
    }

    public void setValue(short value) {
        this.value = value;
    }
}