package com.cslounge.backend.comment;

import java.util.List;

import org.springframework.stereotype.Service;

@Service 
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(
        CommentRepository commentRepository
    ) {
        this.commentRepository = commentRepository;
    }

    public List<CommentResponse> getCommentsForPost(
        Long postId
    ) {
        return commentRepository
            .findCommentsByPostId(postId)
            .stream()
            .map(row -> new CommentResponse(
                row.getId(),
                row.getPostId(),
                row.getContent(),
                row.getAuthor(),
                row.getCreatedAt(),
                row.getVotes()
            ))
            .toList();
    }

    public List<CommentResponse> getCommentsByAuthorId(Long authorId) {
    return commentRepository
        .findCommentsByAuthorId(authorId)
        .stream()
        .map(row -> new CommentResponse(
            row.getId(),
            row.getPostId(),
            row.getContent(),
            row.getAuthor(),
            row.getCreatedAt(),
            row.getVotes()
        ))
        .toList();
    }

    public Comment createComment(
        Long postId,
        Long authorId,
        CreateCommentRequest request
    ) {
        Comment comment = new Comment(
            postId,
            authorId,
            request.content()
        );

        return commentRepository.save(comment);
    }

    public boolean deleteComment(
        Long commentId,
        Long userId
    ) {
        Comment comment = commentRepository
            .findById(commentId)
            .orElse(null);

        if (comment == null) {
            return false;
        }

        if (!comment.getAuthorId().equals(userId)) {
            throw new IllegalStateException(
                "You cannot delete another user's comment"
            );
        }

        commentRepository.delete(comment);

        return true;
    }
}
