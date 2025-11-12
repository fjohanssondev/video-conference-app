import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { AccessToken } from 'livekit-server-sdk';
import { auth } from '../lib/auth.js';
const app = new Hono();
app.use("/api/*", cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
app.post("/api/token", async (c) => {
    const { roomName, identity } = await c.req.json();
    const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
        identity,
        ttl: "10m"
    });
    at.addGrant({ roomJoin: true, room: roomName });
    const token = await at.toJwt();
    return c.json({ token });
});
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
