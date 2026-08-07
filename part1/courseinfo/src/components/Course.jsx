const Header = ({ name }) => <h2>{name}</h2>

const Course = ({ courses }) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </div>
    )
}

const Part = ({ part }) =>
    <p>
      {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <h4>total of {totalExercises} exercises</h4>
  )
}

export default Course