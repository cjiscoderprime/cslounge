package com.cslounge.backend.commentvote;

import jakarta.persistence.*;

@Entity
@Table(name = "comment_votes")
public class CommentVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "user_id")
    private Long userId;

    private short value;

    protected CommentVote() {}

    public CommentVote(
        Long commentId,
        Long userId,
        short value
    ) {
        this.commentId = commentId;
        this.userId = userId;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public Long getCommentId() {
        return commentId;
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