import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create categories
  const programmingCategory = await prisma.category.upsert({
    where: { name: 'Programming' },
    update: {},
    create: {
      name: 'Programming',
      description: 'Programming and development courses',
      icon: '💻',
      color: '#3B82F6'
    }
  })

  const designCategory = await prisma.category.upsert({
    where: { name: 'Design' },
    update: {},
    create: {
      name: 'Design',
      description: 'UI/UX and graphic design courses',
      icon: '🎨',
      color: '#10B981'
    }
  })

  const marketingCategory = await prisma.category.upsert({
    where: { name: 'Marketing' },
    update: {},
    create: {
      name: 'Marketing',
      description: 'Digital marketing courses',
      icon: '📈',
      color: '#F59E0B'
    }
  })

  // Create users with username and plain text passwords
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      name: 'Administrator',
      password: '123',
      role: 'ADMIN',
      bio: 'System administrator with full access to all features.'
    }
  })

  const tutorUser = await prisma.user.upsert({
    where: { username: 'tutor' },
    update: {},
    create: {
      username: 'tutor',
      name: 'John Tutor',
      password: '123',
      role: 'TUTOR',
      bio: 'Experienced tutor with expertise in various subjects.'
    }
  })

  const tutorUser2 = await prisma.user.upsert({
    where: { username: 'jane' },
    update: {},
    create: {
      username: 'jane',
      name: 'Jane Smith',
      password: '123',
      role: 'TUTOR',
      bio: 'UI/UX design specialist and creative professional.'
    }
  })

  const studentUser = await prisma.user.upsert({
    where: { username: 'siswa' },
    update: {},
    create: {
      username: 'siswa',
      name: 'Student User',
      password: '123',
      role: 'STUDENT',
      bio: 'Eager learner ready to explore new courses.'
    }
  })

  const studentUser2 = await prisma.user.upsert({
    where: { username: 'bob' },
    update: {},
    create: {
      username: 'bob',
      name: 'Bob Johnson',
      password: '123',
      role: 'STUDENT',
      bio: 'Programming enthusiast and web development student.'
    }
  })

  console.log('✅ Created default users:')
  console.log('   admin / 123 (Administrator)')
  console.log('   tutor / 123 (Tutor)')
  console.log('   jane / 123 (Tutor)')
  console.log('   siswa / 123 (Student)')
  console.log('   bob / 123 (Student)')

  // Create courses
  const webDevCourse = await prisma.course.create({
    data: {
      title: 'Complete Web Development Bootcamp',
      description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more.',
      price: 750000,
      isPublished: true,
      categoryId: programmingCategory.id,
      creatorId: tutorUser.id,
      thumbnail: '/api/placeholder/300/200'
    }
  })

  const uiuxCourse = await prisma.course.create({
    data: {
      title: 'UI/UX Design Masterclass',
      description: 'Master the art of UI/UX design with modern tools and techniques.',
      price: 500000,
      isPublished: true,
      categoryId: designCategory.id,
      creatorId: tutorUser2.id,
      thumbnail: '/api/placeholder/300/200'
    }
  })

  const marketingCourse = await prisma.course.create({
    data: {
      title: 'Digital Marketing Fundamentals',
      description: 'Learn digital marketing strategies, SEO, social media marketing, and more.',
      price: 400000,
      isPublished: true,
      categoryId: marketingCategory.id,
      creatorId: tutorUser.id,
      thumbnail: '/api/placeholder/300/200'
    }
  })

  // Create modules for web development course
  const webDevModule1 = await prisma.module.create({
    data: {
      title: 'Introduction to Web Development',
      description: 'Learn the basics of web development',
      order: 1,
      courseId: webDevCourse.id
    }
  })

  const webDevModule2 = await prisma.module.create({
    data: {
      title: 'HTML & CSS Fundamentals',
      description: 'Master HTML and CSS',
      order: 2,
      courseId: webDevCourse.id
    }
  })

  // Create lessons
  await prisma.lesson.createMany({
    data: [
      {
        title: 'What is Web Development?',
        content: 'Introduction to web development concepts...',
        videoUrl: 'https://example.com/video1',
        duration: 600,
        order: 1,
        moduleId: webDevModule1.id,
        lessonType: 'VIDEO'
      },
      {
        title: 'Setting Up Your Environment',
        content: 'How to set up your development environment...',
        videoUrl: 'https://example.com/video2',
        duration: 900,
        order: 2,
        moduleId: webDevModule1.id,
        lessonType: 'VIDEO'
      },
      {
        title: 'HTML Basics',
        content: 'Learn HTML fundamentals...',
        videoUrl: 'https://example.com/video3',
        duration: 1200,
        order: 1,
        moduleId: webDevModule2.id,
        lessonType: 'VIDEO'
      },
      {
        title: 'CSS Fundamentals',
        content: 'Learn CSS basics...',
        videoUrl: 'https://example.com/video4',
        duration: 1500,
        order: 2,
        moduleId: webDevModule2.id,
        lessonType: 'VIDEO'
      }
    ]
  })

  // Create enrollments
  await prisma.enrollment.createMany({
    data: [
      {
        userId: studentUser.id,
        courseId: webDevCourse.id,
        progress: 25
      },
      {
        userId: studentUser.id,
        courseId: uiuxCourse.id,
        progress: 50
      },
      {
        userId: studentUser2.id,
        courseId: webDevCourse.id,
        progress: 75
      }
    ]
  })

  // Create payments
  await prisma.payment.createMany({
    data: [
      {
        userId: studentUser.id,
        courseId: webDevCourse.id,
        amount: 750000,
        status: 'SUCCESS',
        paymentMethod: 'Bank Transfer'
      },
      {
        userId: studentUser.id,
        courseId: uiuxCourse.id,
        amount: 500000,
        status: 'SUCCESS',
        paymentMethod: 'E-Wallet'
      },
      {
        userId: studentUser2.id,
        courseId: webDevCourse.id,
        amount: 750000,
        status: 'SUCCESS',
        paymentMethod: 'Credit Card'
      }
    ]
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
