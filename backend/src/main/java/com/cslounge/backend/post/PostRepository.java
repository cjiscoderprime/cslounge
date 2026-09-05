package com.cslounge.backend.post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long>{ 

    @Query(
        value = """
                SELECT 
                    p.id AS id,
                    p.title AS title,
                    p.content AS content,
                    u.username AS author,
                    l.name AS lounge,
                    0::bigint AS votes,
                    0::bigint AS comments
                FROM posts p
                JOIN users u
                    ON p.author_id = u.id
                JOIN lounges l
                    ON p.lounge_id = l.id
                ORDER BY p.created_at DESC
                """,
                nativeQuery = true
    )
    List<PostFeedRow> findFeedPosts();
}
