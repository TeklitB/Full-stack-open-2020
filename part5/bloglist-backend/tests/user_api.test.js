const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const { response } = require('express')

beforeEach(async () => {
    await User.deleteMany({})
    console.log('Blog db cleared.')

    const userObjects = helper.initialUsers
        .map(user => new User(user))
    const promiseUserArray = userObjects.map(user => user.save())
    await Promise.all(promiseUserArray)

    console.log('Done')
})

describe('Retrieving users', () => {
    test('Users returned in json format', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All list of users', async () => {
        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(helper.initialUsers.length)
    })

    test('The first user is', async () => {
        const response = await api.get('/api/users')

        const userName = response.body.map(u => u.username)
        expect(userName).toContain('hellas')
    })

    test('Verifying that users contain the transformed id', async () => {
        const response = await helper.usersInDb()
        expect(response[0].id).toBeDefined()
    })
})

describe('Adding user', () => {
    test('When providing valid request', async () => {
        const newUser = {
            username: 'canonical',
            name: 'Edsger Dijkstra',
            password: 'mashroom'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterAdd = await helper.usersInDb()
        expect(usersAfterAdd).toHaveLength(helper.initialUsers.length + 1)

        const usernames = usersAfterAdd.map(user => user.username)
        expect(usernames).toContain('canonical')
    })

    test('When minimum length is not fulfilled', async () => {
        const userWithNoMinLenght = {
            username: 'si',
            name: 'Ferenc Hámori',
            password: 'ri'
        }

        await api
            .post('/api/users')
            .send(userWithNoMinLenght)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAfterAdd = await helper.usersInDb()
        expect(usersAfterAdd).toHaveLength(helper.initialUsers.length)
    })

    test('When username or password is missing', async () => {
        const userWithoutUsername = {
            name: 'Robert Martin',
            password: 'cleancoder'
        }

        const userWithoutPassword = {
            username: 'roberm',
            name: 'Robert Martin'
        }

        await api
            .post('/api/users')
            .send(userWithoutUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAfterAdd = await helper.usersInDb()
        expect(usersAfterAdd).toHaveLength(helper.initialUsers.length)

        await api
            .post('/api/users')
            .send(userWithoutPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAfterEnd = await helper.usersInDb()
        expect(usersAfterEnd).toHaveLength(helper.initialUsers.length)
    })

    test('When username is not unique', async () => {
        const usernameNotUnique = {
            username: 'root',
            name: 'superuser',
            password: 'clinton'
        }

        await api
            .post('/api/users')
            .send(usernameNotUnique)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAfterEnd = await helper.usersInDb()
        expect(usersAfterEnd).toHaveLength(helper.initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})