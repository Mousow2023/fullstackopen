import { useState } from 'react'

const Filter = ({ filter, onChange }) =>
  <div>
    filter shown with <input value={filter} onChange={ onChange } />
  </div>

const PersonForm = ({
  handleSubmission,
  newName, handeNameInput,
  newNumber, handeNumberInput
 }) =>
  <form onSubmit={handleSubmission}>
    <div>
      <p>name: <input value={newName} onChange={handeNameInput} /></p>
      number: <input value={newNumber} onChange={handeNumberInput}  />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const PersonsToShow = ({ personsToShow }) => (
  <>
    {
      personsToShow.map(person => 
        <Person key={person.id} person={person} />
      )
    }
  </>
)

const Person = ({ person }) =>
  <p>{person.name} {person.number}</p>

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

  const personsToShow = filter === ''
    ? persons
    : persons.filter(
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={e => setFilter(e.target.value)} />

      <h2>add a new</h2>
      <PersonForm
        handleSubmission={handleSubmission}
        newName={newName} handeNameInput={e => setNewName(e.target.value)}
        newNumber={newNumber} handeNumberInput={e => setNumber(e.target.value)}
      />

      <h2>Numbers</h2>
      <PersonsToShow personsToShow={personsToShow} />
    </div>
  )
}

export default App