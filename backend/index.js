
// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import schoolRoutes from './routes/schoolRoutes.js';
// import { initDb } from './databaseconnection/db.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors(
//     {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "DELETE"],
//     credentials: true
//   }
// ));
// // Middleware
// app.use('/uploads', express.static('uploads'));
// app.use(bodyParser.urlencoded({ extended: true }));     



// app.use(bodyParser.json());

// // Initialize database
// await initDb();

// // Routes
// app.use('/api/schools', schoolRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import schoolRoutes from './routes/schoolRoutes.js';
import { initDb } from './databaseconnection/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// For ES module path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize database
await initDb();

// API Routes
app.use('/api/schools', schoolRoutes);

// Serve frontend (React/Vite)
const frontendPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Debug: list all routes to check for errors
console.log('All routes loaded:');
app._router.stack
  .filter(r => r.route)
  .forEach(r => console.log(r.route.path));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

