import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createClient } from 'redis'


const app = express();

dotenv.config();
// Middleware
app.use(express.json());

// db info 
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;
// redis info 
const rdip = process.env.RD_HOST;
const rdport = process.env.RD_PORT;


const redisClient = createClient({
  url:`redis://${rdip}:${rdport}`
}); 

redisClient.on("error", (err) => console.error("Redis Client Error", ));

(async () => {
  await redisClient.connect(); // connect to Redis
  console.log("Connected to Redis!");
})();

const url = `mongodb://${dbuser}:${dbpassword}@${dbhost}:${dbport}`;
mongoose
        .connect(url)
        .then(() => console.log('connected to mangodb'))
        .catch((err) => console.log(err));





// Test route
app.get('/', async (req, res) => {
    await redisClient.set("greeting", "Hello from Redis");
  res.send('Express server is running 🚀,  hi hi   ');
});
// test redis data
app.get('/data', async(req, res)=> {
  const value = await redisClient.get("greeting");
  res.send(`Redis says: ${value}`);
})
// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
