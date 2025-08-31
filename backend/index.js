
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import schoolRoutes from './routes/schoolRoutes.js';
import { initDb } from './databaseconnection/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
    {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
  }
));
// Middleware
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));     



app.use(bodyParser.json());

// Initialize database
await initDb();

// Routes
app.use('/api/schools', schoolRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
