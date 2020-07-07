const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

let token = ''

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('Blog db cleared.')

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('Initial blogs saved.')
    }

    const response = await api
        .post('/api/login')
        .send({
            username: 'hellas',
            password: 'teklit'
        })

    token = response.body.token

    console.log('Logged user', response.body.username)
})

describe('Retrieving blogs', () => {
    test('Blogs returned in json format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All list of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('The first blog contains', async () => {
        const response = await api.get('/api/blogs')

        const blogTitle = response.body.map(b => b.title)
        expect(blogTitle).toContain('React patterns')
    })

    test('Verifying that blogs contain the transformed id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('Retrieving a specific blog', () => {
    test('Retrieval succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultingBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultingBlog.body).toEqual(blogToView)
    })

    test('Retrieval fails with statuscode 404 when blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('Retrieval fails with statuscode 400 when id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('Adding blog', () => {
    test('Add blog with valid request', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            userId: '5efd0199690dfc1e54d9b8ef'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAfterAdd.map(blog => blog.title)
        expect(titles).toContain('Canonical string reduction')
    })

    test('Adding blog with missing likes', async () => {
        const blogWithMissingLikes = {
            title: 'RisingStack Blog',
            author: 'Ferenc Hámori',
            url: 'https://blog.risingstack.com/',
            userId: '5efd02ab690dfc1e54d9b8f0'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blogWithMissingLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length + 1)

        expect(blogsAfterAdd[2].likes).toBe(0)
    })

    test('When title or url is missing', async () => {
        const blogWithoutTitle = {
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
            userId: '5efd02ab690dfc1e54d9b8f0'
        }

        const blogWithoutURL = {
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            likes: 0,
            userId: '5efd02ab690dfc1e54d9b8f0'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blogWithoutTitle)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blogWithoutURL)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAfterEnd = await helper.blogsInDb()
        expect(blogsAfterEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Deleting a blog', () => {
    test('Deletion succeeds with statuscode 204 when id is valid', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            userId: '5efd0199690dfc1e54d9b8ef'
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length + 1)

        const blogToDelete = response.body

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const blogsAfterDelete = await helper.blogsInDb()
        expect(blogsAfterDelete)
            .toHaveLength(helper.initialBlogs.length)

        const titles = blogsAfterDelete.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('Update a blog', () => {
    test('Update succeeds when id is found', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            userId: '5efd0199690dfc1e54d9b8ef'
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterAdd = await helper.blogsInDb()
        expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length + 1)

        const blogToUpdate = response.body

        const updateBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 23,
            userId: '5efd0199690dfc1e54d9b8ef'
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `bearer ${token}`)
            .send(updateBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterUpdate = await helper.blogsInDb()
        expect(blogsAfterUpdate[2].likes).toBe(23)
    })

    test('Update fails when id is not found', async () => {

        const validNonexistingId = await helper.nonExistingId()
        const updateBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 3,
            userId: '5efd0199690dfc1e54d9b8ef'
        }

        await api
            .put(`/api/blogs/${validNonexistingId}`)
            .set('Authorization', `bearer ${token}`)
            .send(updateBlog)
            .expect(404)
            .expect('Content-Type', /application\/json/)

        const blogsAfterUpdate = await helper.blogsInDb()
        expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})