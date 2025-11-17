// //Imports the Redis client factory from the redis Node.js package.
// import { createClient } from "redis";


// //createClient() is how we create a connection object that talks to the Redis server.
// const redisClient = createClient({
  
//   url: process.env.REDIS_URL, //i didnt use env variable thsi time,defaults to a Redis server running locally on port 6379.
// });

// redisClient.on("error", (err) => console.error("Redis Client Error:", err));


// //connects to redis server asynchronously 
// await redisClient.connect();

// // Small test counter for sessions or page hits
// export async function incrementHomeVisits() {
//   const count = await redisClient.incr("home_visit_count");
//   return count;
// }

// export default redisClient;

import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

await redisClient.connect();

export async function incrementHomeVisits() {
  return await redisClient.incr("home_visit_count");
}

export default redisClient;
