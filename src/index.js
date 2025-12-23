import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


const app = express();

dotenv.config();

const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;

const url = `mongodb://${dbuser}:${dbpassword}@${dbhost}:${dbport}`;
mongoose
        .connect(url)
        .then(() => console.log('connected to mangodb'))
        .catch((err) => console.log(err));



// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Express server is running 🚀,  hi hi   ');
});

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
