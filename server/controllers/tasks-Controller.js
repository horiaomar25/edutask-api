import * as tasksModel from "../models/tasksModel.js";

export async function getTasks(req, res) {
  const tasks = await tasksModel.getTasks();
  res.status(200).json({ status: "success", data: tasks });
}

export async function createTask(req, res) {
  const data = req.body;
  const task = await tasksModel.createTask(data);
  res.status(201).json({ status: "success", data: task });
}

export async function getDailyTask(req, res) {
  const id = req.params.id;
  console.log(id)
  const task = await tasksModel.getDailyTaskById(id);

  if (!task) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Task not found" } });
  }
  res.status(200).json({ status: "success", data: task });
}

export async function getWeeklyTaskById(req, res) {
  const id = req.params.id;
  const task = await dailyTaskModel.getWeeklyTaskById(id);

  if (!task) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Task not found" } });
  }
  res.status(200).json({ status: "success", data: task });
}

export async function updateTaskById(req, res) {
  const id = req.params.id;
  const data = req.body;
  const task = await tasksModel.updateTaskById(id, data);
  // Assume 404 status if the author is not found
  if (!task) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Task not found" } });
  }

  res.status(200).json({ status: "success", data: task });
}

export async function deleteTaskById(req, res) {
  const id = req.params.id;
  const task = await tasksModel.deleteTaskById(id);
  // Assume 404 status if the task is not found
  if (!task) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Task not found" } });
  }
  res.status(200).json({ status: "success", data: task });
}



// Completed Task
export async function completeTaskById(req, res){
  const id= req.params.id;
  const task= await tasksModel.completeTaskById(id);

  // Assume 404 status if task not found.
  if(!task){
    return res
    .status(404)
    .json({ status: "fail", data: { msg: "Task not found" } })
  }

  res.status(200).json({ status: "success", data: task });
}



