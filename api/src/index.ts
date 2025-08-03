import express from 'express'
import dotenv from 'dotenv'
// import client from './db'
import { Client } from 'pg'
import { Pool } from 'pg'
import pg from 'pg'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


// require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false, // <--- change this to false
    },
};

const client = new pg.Client(config);
client.connect(function (err: any) {
    if (err) throw err;
    client.query("SELECT VERSION()", [], function (err: any, result: any) {
        if (err) throw err;
        console.log(result.rows[0].version);
        client.end();
    });
});

const pool = new Pool(config);

app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT version()');
    console.log('DB connection successful:', result);
    res.json({ version: result.rows[0].version });
  } catch (error) {
    console.error('DB connection failed:', error);
    res.status(500).json({ error: 'Connection failed' });
  }
});

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript backend!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
