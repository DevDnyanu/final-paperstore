import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Initialize environment variables
dotenv.config();

// Create an instance of Express
const app = express();

// Set the port (defaults to 5000 if not provided in the environment)
const PORT = process.env.PORT || 5000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle all routes and return the React index.html for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
