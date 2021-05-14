// build your `Resource` model here
const db = require('../../data/dbConfig');

function getAll() {
    return db("resources")
}

function getById(id) {
    return db("resources")
        .where("resource_id", id)
        .first()
}

async function createResource(resource) {
    const [id] = await db("resources").insert(resource)
    return getById(id)
}

module.exports = {
    getAll,
    getById,
    createResource,
}