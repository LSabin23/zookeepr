const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
} = require('../lib/zookeepers')
const { zookeepers } = require('../data/zookeepers')
const { validateAnimal } = require('../lib/animals')

jest.mock('fs')

test('creates zookeeper object', () => {
  const zookeeper = createNewZookeeper(
    {
      name: 'Christine',
      id: 'lskd708'
    },
    zookeepers
  )

  expect(zookeeper.name).toBe('Christine')
  expect(zookeeper.id).toBe('lskd708')
})

test('filters by query', () => {
  const startingZookeepers = [
    {
      id: '6',
      name: 'Amiiko',
      age: 43,
      favoriteAnimal: 'Quokkas'
    },
    {
      id: '7',
      name: 'Emmy',
      age: 29,
      favoriteAnimal: 'Duckbilled Platypus'
    }
  ]
  const updatedZookeepers = filterByQuery({ age: 43 }, startingZookeepers)

  expect(updatedZookeepers.length).toEqual(1)
})

test('finds by id', () => {
  const startingZookeepers = [
    {
      id: '6',
      name: 'Amiiko',
      age: 43,
      favoriteAnimal: 'Quokkas'
    },
    {
      id: '7',
      name: 'Emmy',
      age: 29,
      favoriteAnimal: 'Duckbilled Platypus'
    }
  ]

  const result = findById('7', startingZookeepers)

  expect(result.name).toBe('Emmy')
})

test('validates age', () => {
  const zookeeper = {
    id: '6',
    name: 'Amiiko',
    age: 43,
    favoriteAnimal: 'Quokkas'
  }

  const invalidZookeeper = {
    id: '7',
    name: 'Emmy',
    age: '29',
    favoriteAnimal: 'Duckbilled Platypus'
  }

  const result = validateZookeeper(zookeeper)
  const result2 = validateZookeeper(invalidZookeeper)

  expect(result).toBe(true)
  expect(result2).toBe(false)
})
