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
                row.getContent(),
                row.getAuthor(),
                row.getCreatedAt()
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
}
