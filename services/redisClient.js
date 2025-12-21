


// import { createClient } from "redis";

// const redisClient = createClient({
//   url: process.env.REDIS_URL
// });

// redisClient.on("error", (err) => console.error("Redis Client Error:", err));

// await redisClient.connect();

// export async function incrementHomeVisits() {
//   return await redisClient.incr("home_visit_count");
// }

// export default redisClient;


// services/redisClient.js
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const url =
  process.env.NODE_ENV === "test"
    ? process.env.REDIS_URL_TEST
    : process.env.REDIS_URL;

const redisClient = createClient({ url });

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

await redisClient.connect();

export async function incrementHomeVisits() {
  return await redisClient.incr("home_visit_count");
}

export default redisClient;
