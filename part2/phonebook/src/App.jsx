import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from './services/persons'

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

const PersonsToShow = ({ personsToShow, onDelete }) => (
  <>
    {
      personsToShow.map(person => 
        <Person
          key={person.id}
          person={person} 
          onDelete={onDelete}
        />
      )
    }
  </>
)

const Person = ({ person, onDelete }) =>
  <p>{person.name} {person.number}
  <button onClick={() => onDelete(person)} >delete</button></p>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Getting persons from server
  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmission = (e) => {
    e.preventDefault()
    const existedName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (existedName) {
      const changedName = {...existedName, number: newNumber}
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        personServices
          .update(existedName.id, changedName)
          .then(returnedPerson => {
            // Update the state and clear the inputs
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
            setNewName('')
            setNumber('')
          })
      }
      return
    }

    // Saving persons to server
    const personObj = {
      name: newName,
      number: newNumber
    }
    personServices
      .create(personObj)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNumber('')
      })
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      )

  const handleDelete = person => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personServices
        .deletePerson(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

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
      <PersonsToShow personsToShow={personsToShow} onDelete={handleDelete} />
    </div>
  )
}

export default App