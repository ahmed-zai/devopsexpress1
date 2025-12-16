import express from 'express';

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Express server is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
