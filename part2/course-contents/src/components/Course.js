import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header coursename={course.name} />
            <Content courseparts={course.parts} />
            <Total totalExercises={course.parts} />
        </div>
    )
}
const Header = ({ coursename }) => {
    return (
        <div>
            <h1>{coursename}</h1>
        </div>
    )
}

const Content = ({ courseparts }) => {
    return (
        <div>
            {courseparts.map(part => <Part part={part} />)}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <div>
            <p> {part.name} {part.exercises} </p>
        </div>
    )
}

const Total = ({ totalExercises }) => {
    return (
        <div>
            <b>
                <p> total of {
                    totalExercises.reduce((sum, part) => sum + part.exercises, 0)
                } exercises
        </p>
            </b>
        </div>
    )
}

export default Course