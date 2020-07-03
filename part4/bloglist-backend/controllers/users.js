const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.username || !body.password) {
        return response.status(400)
            .json({ error: 'username or password missing' })
    }

    if (body.password.length < 3) {
        return response.status(400)
            .json({ error: 'password must be at least 3 characters length.' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        return response.json(savedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter