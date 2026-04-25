import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const course = await prisma.course.findUnique({
      where: {
        id: id
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true
              }
            }
          }
        },
        _count: {
          select: {
            enrollments: true,
            modules: true
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Check if user has access to this course
    if (session.user.role === 'TUTOR' && course.creatorId !== session.user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params
    
    if (!session || session.user.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, category, level, price, thumbnail, status } = body

    // Check if course exists and belongs to tutor
    const existingCourse = await prisma.course.findUnique({
      where: { id: id }
    })

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    if (existingCourse.creatorId !== session.user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const course = await prisma.course.update({
      where: {
        id: id
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(level && { level }),
        ...(price !== undefined && { price }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(status && { status })
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params
    
    if (!session || session.user.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if course exists and belongs to tutor
    const existingCourse = await prisma.course.findUnique({
      where: { id: id }
    })

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    if (existingCourse.creatorId !== session.user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    await prisma.course.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
