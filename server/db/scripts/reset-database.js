import { pool } from "../index.js";

async function resetDatabase() {
    try {
        // Drop existing tables if they exist
        await pool.query(`
        DROP TABLE IF EXISTS tasks CASCADE;
        `);

        // Create Tasks table
        await pool.query(`
        CREATE TABLE tasks (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            task_name TEXT,
            task_description TEXT,
            task_date DATE,
            task_type TEXT,
            completed BOOLEAN
        )`);

        console.log("Database reset successful");
    } catch (error) {
        console.error("Database reset failed: ", error);
    } finally {
        // End the pool
        await pool.end();
    }
}

await resetDatabase();