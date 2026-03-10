import { createClient } from "redis";

export const pub = createClient({
    url:"redis://redis:6379",
});

export const sub=pub.duplicate();

async function connectRedis() {
    await pub.connect();
    await sub.connect();
    console.log("Redis connected");
}

connectRedis();
