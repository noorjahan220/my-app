'use client';
import { SessionProvider } from "next-auth/react"

export default function NextAuthSessionProvider({ children, session }) {
  return (
    <SessionProvider session={session} refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  )
}
