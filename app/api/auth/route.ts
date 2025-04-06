import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // This is a mock authentication
    // In a real app, you would validate credentials against a database

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    // For demo purposes, any credentials work
    return NextResponse.json(
      {
        success: true,
        user: {
          id: "1",
          name: "Demo User",
          email,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

