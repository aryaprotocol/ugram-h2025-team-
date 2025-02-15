import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: "souleymane",
  host: "localhost",
  database: "ugram",
  password: "12345",
  port: Number("5432"),
});

export default pool;
