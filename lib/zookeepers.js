const fs = require('fs')
const path = require('path')

function filterByQuery (query, zookeepers) {
  let filteredResults = zookeepers

  if (query.age) {
    filteredResults = filteredResults.filter(
      /*
        form data will be coming in as strings, but our JSON is storing age as a number we'll need to convert the form query string to a number to perform a comparison
      */
      // zookeeper is a singular argument in this arrow function so it doesn't need parentheses surrounding it
      zookeeper => zookeeper.age === Number(query.age)
    )
  }
  if (query.favoriteAnimal) {
    filteredResults = filteredResults.filter(
      zookeeper => zookeeper.favoriteAnimal === query.favoriteAnimal
    )
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      zookeeper => zookeeper.name === query.name
    )
  }
  return filteredResults
}

function findById (id, zookeepers) {
  // ids are unique so this result variable can be a const because it will always be the first index item in the filtered zookeeper array as there should always only be one item in this filtered array
  const result = zookeepers.filter(zookeeper => zookeeper.id === id)[0]
  return result
}

function createNewZookeeper (body, zookeepers) {
  const zookeeper = body

  zookeepers.push(zookeeper)
  fs.writeFileSync(
    path.join(__dirname, '../data/zookeepers.json'),
    // since property and value are the same we'll just use zookeepers instead of zookeepers: zookeepers for our stringify value
    JSON.stringify({ zookeepers }, null, 2)
  )
  return zookeeper
}

function validateZookeeper (zookeeper) {
  if (!zookeeper.name || typeof zookeeper.name !== 'string') {
    return false
  }
  if (!zookeeper.age || typeof zookeeper.age !== 'number') {
    return false
  }
  if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string') {
    return false
  }
  return true
}

module.exports = {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
}
