import { cookies } from "next/headers"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { value } = body

    if (value !== 1 && value !== -1) {
      return Response.json(
        {
          error: {
            message: "Vote must be 1 or -1",
          },
        },
        {
          status: 400,
        }
      )
    }

    const cookieStore = await cookies()
    const sessionId = cookieStore.get("JSESSIONID")

    if (!sessionId) {
      return Response.json(
        {
          error: {
            message: "You must be logged in to vote",
          },
        },
        {
          status: 401,
        }
      )
    }

    const response = await fetch(
      `http://localhost:8080/posts/${id}/vote`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `JSESSIONID=${sessionId.value}`,
        },
        body: JSON.stringify({
          value,
        }),
      }
    )

    if (response.status === 401) {
      return Response.json(
        {
          error: {
            message: "You must be logged in to vote",
          },
        },
        {
          status: 401,
        }
      )
    }

    if (!response.ok) {
      throw new Error("Spring backend failed to save vote")
    }

    const vote = await response.json()

    return Response.json({
      data: vote,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: {
          message: "Failed to vote",
        },
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const cookieStore = await cookies()
    const sessionId = cookieStore.get("JSESSIONID")

    if (!sessionId) {
      return Response.json(
        {
          error: {
            message: "You must be logged in to vote",
          },
        },
        {
          status: 401,
        }
      )
    }

    const response = await fetch(
      `http://localhost:8080/posts/${id}/vote`,
      {
        method: "DELETE",
        headers: {
          Cookie: `JSESSIONID=${sessionId.value}`,
        },
      }
    )

    if (!response.ok && response.status !== 204) {
      throw new Error("Spring backend failed to remove vote")
    }

    return new Response(null, {
      status: 204,
    })
    } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: {
          message: "Failed to remove vote",
        },
      },
      {
        status: 500,
      }
    )
  }
}