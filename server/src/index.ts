import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { AccessToken } from 'livekit-server-sdk'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use("/api/*", cors({
  origin: "http://localhost:5173"
}))

app.post("/api/token", async (c) => {
  const { roomName, identity } = await c.req.json()

  const at = new AccessToken("devkey", "secret", {
    identity
  })

  at.addGrant({ roomJoin: true, room: roomName })
  
  const token = await at.toJwt()

  return c.json({ token })
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
