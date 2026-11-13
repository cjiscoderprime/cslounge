import { cookies } from "next/headers"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { value } = await request.json()

    if (value !== 1 && value !== -1) {
      return Response.json(
        { error: { message: "Vote must be 1 or -1" } },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    const sessionId = cookieStore.get("JSESSIONID")

    if (!sessionId) {
      return Response.json(
        { error: { message: "Not logged in" } },
        { status: 401 }
      )
    }

    const response = await fetch(
      `http://localhost:8080/comments/${id}/vote`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `JSESSIONID=${sessionId.value}`,
        },
        body: JSON.stringify({ value }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to vote on comment")
    }

    return Response.json({
      data: await response.json(),
    })

  } catch (error) {
    console.error(error)

    return Response.json(
      { error: { message: "Failed to vote" } },
      { status: 500 }
    )
  }
}