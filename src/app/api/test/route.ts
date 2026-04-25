import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    const courses = await prisma.course.findMany();
    
    return Response.json({
      success: true,
      data: {
        users: users,
        courses: courses,
        totalUsers: users.length,
        totalCourses: courses.length
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return Response.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
