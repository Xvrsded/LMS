import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Mock users for development - simple login
const mockUsers = [
  {
    id: '1',
    email: 'admin',
    name: 'Admin User',
    password: '123',
    role: 'ADMIN'
  },
  {
    id: '2',
    email: 'tutor',
    name: 'Tutor User',
    password: '123',
    role: 'TUTOR'
  },
  {
    id: '3',
    email: 'student',
    name: 'Student User',
    password: '123',
    role: 'STUDENT'
  }
]

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this-in-production',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = mockUsers.find(u => u.email === credentials.username)

        if (!user) {
          return null
        }

        // Simple password comparison (plain text for development)
        if (credentials.password !== user.password) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}
