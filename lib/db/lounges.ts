import pool from "@/lib/db/pool"
import type { Lounge } from "@/types/lounge"

export async function getLounges(): Promise<Lounge[]>{
    const result = await pool.query(
        `
        SELECT
            id,
            name,
            slug
        FROM lounges
        ORDER BY name ASC
        `)
        return result.rows
}