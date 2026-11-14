package com.cslounge.backend.post;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(
    value = """
        SELECT
            p.id AS id,
            p.title AS title,
            p.content AS content,
            u.username AS author,
            l.name AS lounge,
            COALESCE(SUM(v.value), 0)::bigint AS votes,
            COUNT(DISTINCT c.id)::bigint AS comments
        FROM posts p
        JOIN users u 
            ON p.author_id = u.id
        JOIN lounges l 
            ON p.lounge_id = l.id
        LEFT JOIN post_votes v 
            ON p.id = v.post_id
        LEFT JOIN comments c 
            ON p.id = c.post_id
        GROUP BY
            p.id,
            p.title,
            p.content,
            u.username,
            l.name,
            p.created_at
        ORDER BY p.created_at DESC
        """,
            nativeQuery = true
    )
    List<PostFeedRow> findFeedPosts();


    @Query(
        value = """
            SELECT
                p.id AS id,
                p.title AS title,
                p.content AS content,
                u.username AS author,
                l.name AS lounge,
                COALESCE(SUM(v.value), 0)::bigint AS votes,
                COUNT(DISTINCT c.id)::bigint AS comments
            FROM posts p
            JOIN users u
                ON p.author_id = u.id
            JOIN lounges l
                ON p.lounge_id = l.id
            LEFT JOIN post_votes v
                ON p.id = v.post_id
            LEFT JOIN comments c
                ON p.id = c.post_id
            WHERE p.author_id = :authorId
            GROUP BY
                p.id,
                p.title,
                p.content,
                u.username,
                l.name,
                p.created_at
            ORDER BY p.created_at DESC
            """,
        nativeQuery = true
    )
    List<PostFeedRow> findFeedPostsByAuthorId(
        @Param("authorId") Long authorId
    );

    @Query(
        value = """
            SELECT
                p.id AS id,
                p.title AS title,
                p.content AS content,
                u.username AS author,
                l.name AS lounge,
                COALESCE(SUM(v.value), 0)::bigint AS votes,
                COUNT(DISTINCT c.id)::bigint AS comments
            FROM posts p
            JOIN users u
                ON p.author_id = u.id
            JOIN lounges l
                ON p.lounge_id = l.id
            LEFT JOIN post_votes v
                ON p.id = v.post_id
            LEFT JOIN comments c
                ON p.id = c.post_id
            WHERE l.slug = :slug
            GROUP BY
                p.id,
                p.title,
                p.content,
                u.username,
                l.name,
                p.created_at
            ORDER BY p.created_at DESC
            """,
        nativeQuery = true
    )
    List<PostFeedRow> findFeedPostsByLoungeSlug(
        @Param("slug") String slug
    );

    @Query(
        value = """
            SELECT
                p.id AS id,
                p.title AS title,
                p.content AS content,
                u.username AS author,
                l.name AS lounge,
                COALESCE(SUM(v.value), 0)::bigint AS votes,
                COUNT(DISTINCT c.id)::bigint AS comments
            FROM posts p
            JOIN users u
                ON p.author_id = u.id
            JOIN lounges l
                ON p.lounge_id = l.id
            LEFT JOIN post_votes v
                ON p.id = v.post_id
            LEFT JOIN comments c
                ON p.id = c.post_id
            WHERE p.id = :id
            GROUP BY
                p.id,
                p.title,
                p.content,
                u.username,
                l.name,
                p.created_at
            """,
        nativeQuery = true
    )
    Optional<PostFeedRow> findPostById(
        @Param("id") Long id
    );
}