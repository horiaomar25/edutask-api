import { pool } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";

export async function getTasks() {
  // Query the database and return all authors

  // Define the SQL query to fetch all authors from the 'authors' table
  const queryText = "SELECT * FROM tasks";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

// 1. Create Task with Add Task

//Query the database to create a task and return the new task
export async function createTask(tasks) {
  // Define the SQL query for inserting a new task into the tasks table.
  const queryNewTask = `
    INSERT INTO tasks (task_name, task_description,task_date, task_type)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

  // Use the pool object to send the query to the database
  const newTask = await pool.query(queryNewTask, [
    tasks.task_name,
    tasks.task_description,
    tasks.task_date,
    tasks.task_type,
  ]);

  //The rows property of the result object contains the inserted record.
  return newTask.rows[0];
}

// 2. Daily Tasks

// Query the database and return the task with a matching id or null
export async function getDailyTaskById(id) {
  // Define the SQL query to fetch the task with the specified id and task_type 'Daily' from the tasks table.
  const dailyTask = 'SELECT * FROM tasks WHERE id = $1 AND task_type = $2';

  // Use the pool object to send the query to the database
  // passing the id and task_type as parameters to prevent SQL injection
  const taskId = await pool.query(dailyTask, [id, 'Daily']);

  // The rows property of the result object contains the retrieved records
  return taskId.rows[0] || null;
}

//  1.Weekly Tasks

// Query the database and return the task with a matching id or null
export async function getWeeklyTaskById(id) {
  // Define the SQL query to fetch the task with the specified id and task_type 'Weekly' from the tasks table.
  const weeklyTask = 'SELECT * FROM tasks WHERE id = $1 AND task_type = $2';

  // Use the pool object to send the query to the database
  // passing the id and task_type as parameters to prevent SQL injection
  const taskId = await pool.query(weeklyTask, [id, 'Weekly']);

  // The rows property of the result object contains the retrieved records
  return taskId.rows[0] || null;
}


// UPDATE TASK

//Define the SQL query for updating the specified task in the Tasks table
export async function updateTaskById(id, edit) {
  const queryTask = `
    UPDATE Tasks
    SET task_name = COALESCE($1, task_name), 
        task_description = COALESCE($2, task_description),
        task_date = COALESCE($3, task_date),
        task_type = COALESCE($4, task_type)
    WHERE id = $5
    `;

  // Use the pool object to send the query to the database
  const updateTask = await pool.query(queryTask, [
    edit.task_name,
    edit.task_description,
    edit.task_date,
    edit.task_type,
    id,
  ]);

  // The rows property of the result object contains the updated record
  return updateTask.rows[0] || null;
}

// DELETE TASK

export async function deleteTaskById(id) {
  //Query the database to delete a book and return the deleted task.

  const queryTask = `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *;
    `;

  // Parameterize the query to prevent SQL injection
  // Use the pool object to send the query to the dataabse
  const result = await pool.query(queryTask, [id]);

  return result.rows[0] || null;
}



// Complete Task By ID
export async function completeTaskById(id){
  const completeTask = `
  UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *
  
  `
  const result = await pool.query(completeTask, [true, id]);
  
  return result.rows[0] || null;

 
}







