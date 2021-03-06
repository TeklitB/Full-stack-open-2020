require('dotenv').config()
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/books')

const app = express()

//Middleware
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const morganLogger = (loggs, req, res) => {
    var logToken = [
        loggs.method(req, res),
        loggs.url(req, res),
        loggs.status(req, res),
        loggs.res(req, res, 'content-length'),
        '-',
        loggs['response-time'](req, res),
        'ms'
    ]

    if (req.method === 'POST') {
        logToken = logToken.concat(JSON.stringify(req.body))
    }

    return logToken.join(' ')
}

//middleware
app.use(morgan(morganLogger))


app.get('/info', (req, res, next) => {
    const date = new Date()
    Person.countDocuments({}, (error, count) => {
        res.send(`<p>Phonebook has info for ${count} people<p/><p>
    ${date}</p>`)
    }).catch((error) => next(error))
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})