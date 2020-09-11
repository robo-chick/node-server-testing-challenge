const db = require("../data/config")

function find() {
    return db("ponies")
}

function findById(id) {
    return db("ponies")
        .where({id})
        .first()
}

async function create(data) {
    const [id] = await db("ponies")
        .insert(data)
    return findById(id)
}

async function update(id, data) {
    await db("ponies")
        .where({id})
        .update(data)
    return findById(id)
}

function remove(id) {
    return db("ponies")
        .where({id})
        .del()
}

module.exports = {
    find,
    findById,
    create,
    update,
    remove,
}