import pool from "@/lib/db/pool"
import type { Post } from "@/types/post"

export async function getPosts(): Promise<Post[]> {
    const result = await pool.query(
        `
        SELECT 
            posts.id, 
            posts.title,
            users.username AS author,
            lounges.name AS lounge,
            0 AS votes, 
            0 AS comments
        FROM posts
        JOIN users
            ON posts.author_id = users.id
        JOIN lounges
            ON posts.lounge_id = lounges.id
        ORDER BY posts.created_at DESC;
        `);
        return result.rows;
}

type CreatePostInput = {
    authorId: string
    loungeId: string
    title: string
    content: string
}

export async function createPost({
    authorId,
    loungeId,
    title,
    content,
}: CreatePostInput){
    const result = await pool.query(
        `
        INSERT INTO posts (
        author_id,
        lounge_id,
        title,
        content
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, content, created_at
        `,
        [authorId, loungeId, title, content]
    )
    return result.rows[0]
}

export async function getPostsByLoungeSlug(
    slug: string
): Promise<Post[]>{
    const result = await pool.query(
        `
        SELECT 
            posts.id,
            posts.title,
            users.username AS author,
            lounges.name AS lounge,
            0 AS votes,
            0 as comments
        FROM posts
        JOIN users
        ON posts.author_id = users.id
        JOIN lounges
        ON posts.lounge_id = lounges.id
        WHERE lounges.slug = $1
        ORDER BY posts.created_at DESC
        `,
        [slug]
    )
    return result.rows
}