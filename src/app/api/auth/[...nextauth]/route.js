import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      const name = session?.user?.name || ""

      session.user.username = name.split(" ").join("").toLowerCase()
      session.user.uid = token?.sub || null

      return session
    },
  },
})

export { handler as GET, handler as POST }