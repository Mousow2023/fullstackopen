import { useState } from 'react'

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Stats = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={positive + '%'} />
    </>
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all == 0 ? 0 : (good - bad) / all
  const positive = all == 0 ? 0 : (good / all) * 100

  return (
    <div>
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      <h2>Statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App