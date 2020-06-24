const express = require('express')
const cors = require('cors')
const { request, response } = require('express')
var morgan = require('morgan');
const app = express()

//Middleware
app.use(express.json())
app.use(cors())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

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

app.get('/', (req, res) => {
    res.send('Hello Phonebook Backend App.')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people<p/><p>
    ${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

const generateId = () => {
    const newId = Math.floor(Math.random()
        * Math.floor(50))
    console.log(newId)

    return newId
}

app.post('/api/persons', (req, res) => {
    const inData = req.body
    const nameExist = persons.find(p => p.name === inData.name)

    if (!inData.name || !inData.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } else if (nameExist) {
        return console.log('name already exists')
    }
    const person = {
        name: inData.name,
        number: inData.number,
        id: generateId()
    }
    console.log(person)
    persons = persons.concat(person)

    res.json(person)
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const port = 3001
app.listen(port)
console.log(`Server is running on port ${port}`)