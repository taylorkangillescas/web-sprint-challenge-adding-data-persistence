// build your `Task` model here
const db = require('../../data/dbConfig');

const convertToBoolean = task => {
    if (task.task_completed === 0 || !task.task_completed) {
        return {...task, "task_completed": false};
    } else {
        return {...task, "task_completed": true};
    }
};

async function getAll() {
    const tasks = await db("tasks as t")
        .join("projects as p", "p.project_id", "t.project_id")
        .select(
            "t.task_id",
            "t.task_description",
            "t.task_notes",
            "t.task_completed",
            "p.project_name",
            "p.project_description"
        );
    const tasksWithBoolean = tasks.map(task => {
        return convertToBoolean(task);
    });
    return tasksWithBoolean; 
}

async function getById(id) {
    const newTask = await db("tasks as t")
        .where("t.task_id", id)
        .first()
    return convertToBoolean(newTask)
}

async function createTask(task) {
    const convertFromBoolean = task => {
        if (task.task_completed === false || !task.task_completed) {
            return {...task, "task_completed": 0}
        } else {
            return {...task, "task_completed": 1}
        }
    }

    const [task_id] = await db("tasks").insert(convertFromBoolean(task))
    return getById(task_id)
}

module.exports = {
    getAll,
    getById,
    createTask,
}