import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handeNameInput = (e) => {
    setNewName(e.target.value)
  }

  const handeNumberInput = (e) => {
    setNumber(e.target.value)
  }

  const handleSubmission = (e) => {
    e.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return      
    }

    setPersons(persons.concat({
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }))
    setNewName('')
    setNumber('')
  }

  const handleFilter = e => {
    setFilter(e.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilter} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={handleSubmission}>
        <div>
          <p>name: <input value={newName} onChange={handeNameInput} /></p>
          number: <input value={newNumber} onChange={handeNumberInput}  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {
        personsToShow.map(
          person => <p key={person.id}>{person.name} {person.number}</p>
        )
      }
    </div>
  )
}

export default App