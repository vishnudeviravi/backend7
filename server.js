import express from 'express';
import cors from 'cors';
import mongoose from './db/db.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config({ path: './.env' });

//middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use(routes);

// NO ROUTE FOUND
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route Not Found!' });
});

app.listen(process.env.PORT, () => {
  console.log('App is running @ http://localhost:4000/');
});
