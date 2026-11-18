import { cookies } from "next/headers"

import { BACKEND_URL } from "@/lib/backend"

export async function GET() {
  const response = await fetch(
    `{BACKEND_URL}/lounges`,
    {
      cache: "no-store",
    }
  )

  if (!response.ok) {
    return Response.json(
      {
        error: {
          message: "Failed to load lounges",
        },
      },
      { status: response.status }
    )
  }

  const lounges = await response.json()

  return Response.json({
    data: lounges,
  })
}


export async function POST(request: Request) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("JSESSIONID")

  if (!sessionId) {
    return Response.json(
      {
        error: {
          message: "You must be logged in",
        },
      },
      { status: 401 }
    )
  }

  const { name } = await request.json()

  if (!name?.trim()) {
    return Response.json(
      {
        error: {
          message: "Lounge name is required",
        },
      },
      { status: 400 }
    )
  }

  const response = await fetch(
    `{BACKEND_URL}/lounges`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `JSESSIONID=${sessionId.value}`,
      },
      body: JSON.stringify({
        name: name.trim(),
      }),
    }
  )

  if (!response.ok) {
    const message = await response.text()

    return Response.json(
      {
        error: {
          message:
            message ||
            "Failed to create lounge",
        },
      },
      { status: response.status }
    )
  }

  const lounge = await response.json()

  return Response.json(
    {
      data: lounge,
    },
    { status: 201 }
  )
}