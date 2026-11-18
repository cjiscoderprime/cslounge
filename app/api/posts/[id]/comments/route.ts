import { cookies } from "next/headers"

import { BACKEND_URL } from "@/lib/backend"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const response = await fetch(
      `${BACKEND_URL}/posts/${id}/comments`,
      {
        cache: "no-store",
      }
    )

    if (!response.ok) {
      throw new Error("Spring backend failed to load comments")
    }

    const comments = await response.json()

    return Response.json({
      data: comments,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: {
          message: "Failed to load comments",
        },
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { content } = body

    if (!content || !content.trim()) {
      return Response.json(
        {
          error: {
            message: "Comment cannot be empty",
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
            message: "You must be logged in to comment",
          },
        },
        {
          status: 401,
        }
      )
    }

    const response = await fetch(
      `${BACKEND_URL}/posts/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `JSESSIONID=${sessionId.value}`,
        },
        body: JSON.stringify({
          content,
        }),
      }
    )

    if (response.status === 401) {
      return Response.json(
        {
          error: {
            message: "You must be logged in to comment",
          },
        },
        {
          status: 401,
        }
      )
    }

    if (!response.ok) {
      throw new Error("Spring backend failed to create comment")
    }

    const comment = await response.json()

    return Response.json(
      {
        data: comment,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: {
          message: "Failed to create comment",
        },
      },
      {
        status: 500,
      }
    )
  }
}