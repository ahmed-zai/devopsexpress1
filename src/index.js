import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();



// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Express server is running 🚀,   ');
});

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
