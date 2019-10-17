const db = require('../../data/dbConfig')

module.exports = {
  find,
  findBy,
  findById,
  add,
  findDept,
}

function find() {
  return db('users')
    .then(users => users)
}

function findBy(filter) {
  console.log(filter)
  return db('users')
    .where(filter)
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
    .then(user => user)
}

function add(userData) {
  return db('users')
    .insert(userData)
    .then(userIdArr => findById(userIdArr[0]))
}

function findDept(id) {
  return db('users')
    .where({ id })
    .first()
    .then(user => findBy({ department: user.department }))
}