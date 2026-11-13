package com.cslounge.backend.comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(
        value = """
            SELECT 
                c.id AS id,
                c.content AS content,
                u.username AS author,
                c.created_at AS "createdAt"
            FROM comments c
            JOIN users u
                ON c.author_id = u.id
            WHERE c.post_id = :postId
            ORDER BY c.created_at ASC
            """,
            nativeQuery = true
    )
    List<CommentRow> findCommentsByPostId(
        @Param("postId") Long postId
    );
}
