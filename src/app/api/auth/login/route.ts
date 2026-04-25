import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password diperlukan" },
        { status: 400 }
      )
    }

    // Validate input types
    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: "Invalid input types" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        name: true,
        avatar: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan" },
        { status: 404 }
      )
    }

    // Simple password comparison (plain text for demo)
    // In production, use bcrypt: const isValid = await bcrypt.compare(password, user.password)
    const isValid = password === user.password

    if (!isValid) {
      return NextResponse.json(
        { error: "Password tidak valid" },
        { status: 401 }
      )
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: "Server internal error" },
      { status: 500 }
    )
  }
}
