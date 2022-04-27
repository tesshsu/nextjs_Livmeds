import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: '175902219217-k5frmbro2oghubqf533inlo0a1d4v9dv.apps.googleusercontent.com',
      clientSecret: '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',
    })
  ],
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
})
