import pool from "@/lib/db/pool"

export async function GET(){
    try{
        const result = await pool.query("SELECT NOW()")

        return Response.json({
            status: "ok",
            databaseTime: result.rows[0].now,
        })
    } catch(error) {
        console.error(error)
        
        return Response.json(
            {
                status: "error",
                message: "Database connection failed",
            },
            {
                status: 500,
            }
        )
    }
}

