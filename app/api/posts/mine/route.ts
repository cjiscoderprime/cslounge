import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("JSESSIONID")

  if (!sessionId) {
    return Response.json(
      { error: { message: "Not logged in" } },
      { status: 401 }
    )
  }

  const response = await fetch(
    "http://localhost:8080/posts/mine",
    {
      headers: {
        Cookie: `JSESSIONID=${sessionId.value}`,
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    const message = await response.text()

    return Response.json(
      {
        error: {
          message:
            message || "Failed to load your posts",
        },
      },
      { status: response.status }
    )
  }

  const posts = await response.json()

  return Response.json({
    data: posts,
  })
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("JSESSIONID")

  if (!sessionId) {
    return Response.json(
      { error: { message: "Not logged in" } },
      { status: 401 }
    )
  }

  const { postId } = await request.json()

  if (!postId) {
    return Response.json(
      { error: { message: "postId is required" } },
      { status: 400 }
    )
  }

  const response = await fetch(
    `http://localhost:8080/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `JSESSIONID=${sessionId.value}`,
      },
    }
  )

  if (!response.ok) {
    const message = await response.text()

    return Response.json(
      {
        error: {
          message:
            message || "Failed to delete post",
        },
      },
      { status: response.status }
    )
  }

  return new Response(null, {
    status: 204,
  })
}