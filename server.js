const { animals } = require('./data/animals')
const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()

// takes in req.query as an argument, filters through the animals accordingly, then returns the new filtered array
function filterByQuery (query, animalsArray) {
  let personalityTraitsArray = []
  // the animalsArray is saved as filteredResults here
  let filteredResults = animalsArray

  if (query.personalityTraits) {
    // save personalityTraits as a dedicated array
    // if personalityTraits is a string, place it into a new array and save
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits]
    } else {
      personalityTraitsArray = query.personalityTraits
    }
    // loop through each trait in the personalityTraits array
    personalityTraitsArray.forEach(trait => {
      /*
        Check the trait against each animal in the filteredResults array
        Remember, it's initially a copy of the animalsArray, but we're updating it
        for each trait in the forEach() loop.
        For each trait being targeted by the filter, the filteredResults array
        will then contain only the entries that contain the trait, so at the end
        we'll have an array of animals that have every one of the traits when the .forEach()
        loop is finished.
      */
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      )
    })
  }

  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species)
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name)
  }
  return filteredResults
}

app.get('/api/animals', (req, res) => {
  let results = animals
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server now on port ${PORT}!`)
})
