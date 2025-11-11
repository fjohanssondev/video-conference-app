import { createAuthClient } from "better-auth/react"

export const { signIn, signOut, useSession, getSession } = createAuthClient({
  baseURL: import.meta.env.VITE_SERVER_URL
})