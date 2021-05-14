// build your `Project` model here
const db = require('../../data/dbConfig');

const convertToBoolean = project => {
    if (project.project_completed === 0 || !project.project_completed) {
        return {...project, "project_completed": false};
    } else {
        return {...project, "project_completed": true};
    }
};

async function getAll() {
    const projects = await db("projects as p");
    const projectsWithBoolean = projects.map(project => {
        return convertToBoolean(project);
    });
    return projectsWithBoolean; 
}

async function getById(id) {
    const newProject = await db("projects as p")
        .where("p.project_id", id)
        .first()
    return convertToBoolean(newProject)
}

async function createProject(project) {
    const convertFromBoolean = project => {
        if (project.project_completed === false || !project.project_completed) {
            return {...project, "project_completed": 0}
        } else {
            return {...project, "project_completed": 1}
        }
    }

    const [project_id] = await db("projects").insert(convertFromBoolean(project))
    return getById(project_id)
}

module.exports = {
    getAll,
    getById,
    createProject,
}