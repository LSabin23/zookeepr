// module provided, but not actually needed?
// const fs = require('fs')
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal
} = require('../lib/animals.js')
const { animals } = require('../data/animals')

jest.mock('fs')

test('creates an animal object', () => {
  const animal = createNewAnimal(
    { name: 'Darby', id: 'oawh8923' },
    animals
  )

  expect(animal.name).toBe('Darby')
  expect(animal.id).toBe('oawh8923')
})

test('filters by query', () => {
  const startingAnimals = [
    {
      id: '3',
      name: 'Erica',
      species: 'gorilla',
      diet: 'omnivore',
      personalityTraits: ['quirky', 'rash']
    },
    {
      id: '4',
      name: 'Noel',
      species: 'bear',
      diet: 'carnivore',
      personalityTraits: ['impish', 'sassy', 'brave']
    }
  ]

  const updatedAnimals = filterByQuery({ species: 'bear' }, startingAnimals)

  // wouldn't a better test expect updatedAnimals to be the filtered animal object itself?
  expect(updatedAnimals.length).toEqual(1)
})

test('finds by id', () => {
  const startingAnimals = [
    {
      id: '3',
      name: 'Erica',
      species: 'gorilla',
      diet: 'omnivore',
      personalityTraits: ['quirky', 'rash']
    },
    {
      id: '4',
      name: 'Noel',
      species: 'bear',
      diet: 'carnivore',
      personalityTraits: ['impish', 'sassy', 'brave']
    }
  ]

  const result = findById('4', startingAnimals)

  expect(result.name).toBe('Noel')
})

// enhancement opportunity to add tests for validating the typeof data for the other animal properties
test('validates personality traits', () => {
  const animal = {
    id: '4',
    name: 'Noel',
    species: 'bear',
    diet: 'carnivore',
    personalityTraits: ['impish', 'sassy', 'brave']
  }

  const invalidAnimal = {
    id: '4',
    name: 'Noel',
    species: 'bear',
    diet: 'carnivore'
  }

  const result = validateAnimal(animal)
  const result2 = validateAnimal(invalidAnimal)

  expect(result).toBe(true)
  expect(result2).toBe(false)
})
