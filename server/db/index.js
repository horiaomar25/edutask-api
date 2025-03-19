// filepath: c:\Users\Horia Omar\OneDrive\Pictures\Documents\Coding Projects\Main Projects\edutask-api\server\db\index.js
import 'dotenv/config';
import pg from 'pg';

const connectionString = process.env.DB_CONNECTION_STRING;

if (!connectionString) {
    throw new Error('No connection string defined');
}

export const pool = new pg.Pool({
    connectionString,
});