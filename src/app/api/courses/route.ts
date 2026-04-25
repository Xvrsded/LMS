import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const tutorId = searchParams.get('tutorId')
    const status = searchParams.get('status')

    let whereClause: any = {}
    
    if (session.user.role === 'TUTOR') {
      whereClause.creatorId = session.user.id
    } else if (tutorId) {
      whereClause.creatorId = tutorId
    }
    
    if (status) {
      whereClause.status = status
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        enrollments: {
          select: {
            id: true,
            userId: true,
            progress: true
          }
        },
        _count: {
          select: {
            enrollments: true,
            modules: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, category, level, price, thumbnail } = body

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: price || 0,
        thumbnail: thumbnail || null,
        categoryId: 'programming-category-id', // This should be replaced with actual category ID
        creatorId: session.user.id,
        isPublished: false
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

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}
